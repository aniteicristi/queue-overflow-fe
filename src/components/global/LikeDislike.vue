<script setup lang="ts">
import { Question } from "../../models/Question.model";

const props = defineProps({ question: { required: true, type: Question } });
</script>

<template>
  <div class="flex flex-col items-center p-2">
    <button class="btn btn-ghost m-1 btn-xs">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
    <p>{{ question.clout }}</p>
    <button class="btn btn-ghost m-1 btn-xs">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
</template>
