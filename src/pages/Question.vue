<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { Question } from "../models/Question.model";
import { QuestionsService } from "../services/questions.service";
import QuestionOverview from "../components/global/QuestionOverview.vue";
import AnswerCard from "../components/global/AnswerCard.vue";

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
      <AnswerCard v-for="answer in question.answers" :answer="answer" />
    </div>
  </div>
</template>
