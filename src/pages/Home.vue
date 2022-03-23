<script setup lang="ts">
import { ref } from "vue";
import { Question } from "../models/Question.model";
import QuestionCard from "../components/global/QuestionCard.vue";

const questions = ref([
  new Question(1, "First question", "Is there any way you caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddddd"),
  new Question(2, "Second question", "Is there any way you can"),
  new Question(3, "Third question", "Is there any way you can"),
  new Question(4, "Fourth question", "Is there any way you can"),
]);
</script>

<template>
  <base-component class="w-screen p-5">
    <div v-for="question in questions" class="w-full flex flex-col items-center">
      <question-card :question="question" class="my-7" />
    </div>
  </base-component>
</template>
