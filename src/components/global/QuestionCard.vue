<script setup lang="ts">
import { ref } from "@vue/runtime-dom";
import { useRouter } from "vue-router";
import { Question } from "../../models/Question.model";

const router = useRouter();

defineProps<{
  question: Question;
}>();

function openQuestion(id: number | undefined) {
  if (!id) return;
  router.push(`/question/${id}`);
}

function clamp(text: string, maxLen: number = 60) {
  return text.length > maxLen ? text.substring(0, maxLen) + "..." : text;
}
</script>

<template>
  <div class="card p-3 m-7 w-2/3 bg-base-100 shadow-md hover:shadow-lg" @click="openQuestion(question.id)">
    <div class="card-body">
      <div class="flex w-full">
        <div class="w-[10%]">
          <p>Clout</p>
          {{ question.clout }}
        </div>
        <div class="w-[95%]">
          <h2 class="card-title text-3xl">{{ question.title }}</h2>
          <p>{{ clamp(question.text) }}</p>
        </div>
      </div>
    </div>
    <div class="card-actions flex flex-row-reverse">
      {{ `Asked by ${question.author.email} on ${question.createdAt.toDateString()}` }}
    </div>
  </div>
</template>
