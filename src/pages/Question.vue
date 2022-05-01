<script setup lang="ts">
import { computed, onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { Question } from "../models/Question.model";
import { QuestionsService } from "../services/questions.service";
import QuestionOverview from "../components/global/QuestionOverview.vue";
import AnswerCard from "../components/global/AnswerCard.vue";
import { UserService } from "../services/users.service";
import { Answer } from "../models/Answer.model";
import { EditService } from "../services/edit.service";

const route = useRoute();
let question = ref<Question | null>(null);
let text = ref("");

onMounted(async () => {
  question.value = await QuestionsService.instance.get(route.params.question);
});

async function answerQuestion(id: number | null) {
  if (id == null) return;
  const answer = await QuestionsService.instance.addAnswer(id, text.value);
  text.value = "";
  if (answer == null) return;
  question.value?.answers.push(answer);
}
function visible(answer: Answer) {
  return UserService.instance.currentUser.value?.role == "moderator" || answer.author.id == UserService.instance.currentUser.value?.id;
}

function edit(answer: Answer) {
  EditService.instance.answer.value = answer;
}

function remove(answer: Answer) {
  question.value?.answers.splice(
    question.value?.answers.findIndex((a) => a.id == answer.id),
    1
  );
  QuestionsService.instance.removeAnswer(answer.id);
}
</script>

<template>
  <div class="w-screen p-5">
    <div class="flex flex-col items-center" v-if="question != null">
      <QuestionOverview :question="question" />
      <div class="card w-2/3 bg-base-200 card-compact">
        <div class="card-body flex flex-row items-end">
          <textarea class="textarea w-11/12" v-model="text" />
          <button class="btn btn-outline btn-secondary w-1/12" @click="answerQuestion(question?.id)">ANSWER</button>
        </div>
      </div>

      <div v-for="answer in question.answers" class="w-full flex flex-row justify-center">
        <div class="w-2/3 flex flex-row">
          <AnswerCard :answer="answer" class="flex-grow" />
          <div class="flex flex-col my-10" v-if="visible(answer)">
            <label for="editAnswer" class="btn btn-circle btn-ghost" @click="edit(answer)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </label>
            <button class="btn btn-circle btn-ghost" @click="remove(answer)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
