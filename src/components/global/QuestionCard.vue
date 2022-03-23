<script setup lang="ts">
import { ref } from "@vue/runtime-dom";
import { useRouter } from "vue-router";
import { Question } from "../../models/Question.model";

const router = useRouter();

defineProps<{
  question: Question;
}>();

function openQuestion(id: number) {
  router.push(`/question/${id}`);
}

function clamp(text: string, maxLen: number = 40) {
  return text.length > maxLen ? text.substring(0, maxLen) + "..." : text;
}
</script>

<template>
  <div class="card pa-3 ma-7 w-2/3 bg-base-100 shadow-md hover:shadow-lg" @click="openQuestion(question.id)">
    <div class="card-body">
      <h2 class="card-title">{{ question.title }}</h2>
      <p>{{ clamp(question.text) }}</p>
    </div>
  </div>
</template>
