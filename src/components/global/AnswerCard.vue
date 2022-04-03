<script setup lang="ts">
import { Answer } from "../../models/Answer.model";
import LikeDislikeAnswer from "./LikeDislikeAnswer.vue";

const props = defineProps({ answer: { type: Answer, required: true } });
</script>

<template>
  <div class="card m-10 bg-base-200 shadow-md w-2/3 card-compact">
    <div class="w-full card-body flex justify-between flex-row">
      <div class="w-[5%]">
        <LikeDislikeAnswer :answer="answer" />
      </div>
      <div class="w-[95%] flex justify-between flex-col">
        <p class="text-md">{{ `${answer.author.email} answered:` }}</p>
        <p class="text-lg">{{ answer.text }}</p>
      </div>
    </div>
  </div>
</template>
