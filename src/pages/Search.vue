<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Question } from "../models/Question.model";
import { router } from "../router";
import { QuestionsService } from "../services/questions.service";
import QuestionCard from "../components/global/QuestionCard.vue";

const route = useRoute();

const searchTerm = ref(route.params.term as string);

function openQuestion(q: Question) {
  router.push({ name: "Question", params: { question: q.id } });
}

const results = ref<Question[]>([]);

async function search() {
  if (searchTerm.value != "") results.value = await QuestionsService.instance.search(searchTerm.value);
}

onMounted(async () => {
  await search();
});
</script>

<template>
  <div class="w-screen p-5">
    <div class="w-full flex flex-row justify-center">
      <div class="flex flex-row space-x-2 justify-center w-2/3">
        <input class="input flex-grow" placeholder="Search..." v-model="searchTerm" />
        <button class="btn" @click="search()">SEARCH</button>
      </div>
    </div>
    <suspense>
      <div v-for="question in results" class="w-full flex flex-col items-center">
        <question-card :question="question" class="my-7" @click="openQuestion(question)" />
      </div>
    </suspense>
  </div>
</template>
