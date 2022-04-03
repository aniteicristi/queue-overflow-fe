<script setup lang="ts">
import { ref, onMounted } from "vue";
import QuestionCard from "../components/global/QuestionCard.vue";
import { Question } from "../models/Question.model";
import { QuestionsService } from "../services/questions.service";
import QuestionCreateCard from "../components/global/QuestionCreateCard.vue";
import { User, UserRole } from "../models/User.model";
import { useRouter } from "vue-router";

const questions = ref<Question[]>([
  new Question(new User(123, "hilo", UserRole.NORMAL, 0), "Hello", "World", new Date("2001/12/01"), 0, [], []),
  new Question(new User(123, "hilo", UserRole.NORMAL, 0), "Hello", "World", new Date("2001/12/01"), 0, [], []),
  new Question(new User(123, "hilo", UserRole.NORMAL, 0), "Hello", "World", new Date("2001/12/01"), 0, [], []),
  new Question(new User(123, "hilo", UserRole.NORMAL, 0), "Hello", "World", new Date("2001/12/01"), 0, [], []),
]);
const router = useRouter();

onMounted(async () => {
  //questions.value = await QuestionsService.instance.getAll();
});

function openQuestion(q: Question) {
  router.push({ name: "Question", params: { question: q.id } });
}
</script>

<template>
  <div class="w-screen p-5">
    <div class="w-full flex flex-col items-center">
      <question-create-card />
    </div>
    <suspense>
      <div v-for="question in questions" class="w-full flex flex-col items-center">
        <question-card :question="question" class="my-7" @click="openQuestion(question)" />
      </div>
    </suspense>
  </div>
</template>
