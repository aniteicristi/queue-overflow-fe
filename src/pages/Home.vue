<script setup lang="ts">
import { ref, onMounted } from "vue";
import QuestionCard from "../components/global/QuestionCard.vue";
import { Question } from "../models/Question.model";
import { QuestionsService } from "../services/questions.service";
import QuestionCreateCard from "../components/global/QuestionCreateCard.vue";
import { User, UserRole } from "../models/User.model";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { TagsService } from "../services/tags.service";
import { UserService } from "../services/users.service";

let questions = QuestionsService.instance.questions;

const router = useRouter();

const addQuestion = ref(false);
const searchTerm = ref("");

onMounted(async () => {
  await QuestionsService.instance.getAll();
  await UserService.instance.getCurrentUser();
});

function openQuestion(q: Question) {
  router.push({ name: "Question", params: { question: q.id } });
}

function search() {
  router.push({ name: "Search", params: { term: searchTerm.value } });
}
</script>

<template>
  <div class="w-screen p-5">
    <div class="w-full flex flex-row justify-center">
      <div class="flex flex-row space-x-2 justify-center w-2/3">
        <button class="btn" @click="addQuestion = !addQuestion" :class="{ 'btn-primary': addQuestion }">{{ addQuestion ? " CANCEL" : "ASK NEW" }}</button>
        <input class="input flex-grow" placeholder="Search..." v-model="searchTerm" />
        <button class="btn" @click="search()">SEARCH</button>
      </div>
    </div>

    <div class="w-full flex flex-col items-center" v-if="addQuestion">
      <question-create-card @add="addQuestion = false" />
    </div>
    <suspense>
      <div v-for="question in questions" class="w-full flex flex-col items-center">
        <question-card :question="question" class="my-7" @click="openQuestion(question)" />
      </div>
    </suspense>
  </div>
</template>
