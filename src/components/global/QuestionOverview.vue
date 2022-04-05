<script setup lang="ts">
import { Question } from "../../models/Question.model";
import LikeDislike from "./LikeDislike.vue";

const props = defineProps({ question: { type: Question, required: true } });
</script>

<template>
  <div class="card py-5 m-10 bg-base-200 shadow-md w-2/3">
    <div class="w-full card-body flex justify-between flex-row">
      <div class="w-[5%]">
        <LikeDislike :question="question" />
      </div>
      <div class="w-[95%] flex justify-between flex-col">
        <div>
          <h1 class="text-4xl">{{ question.title }}</h1>
          <p class="text-lg">{{ question.text }}</p>
        </div>
        <div class="self-end w-1/2 pt-20">
          Asked by:
          <div class="card bg-base-300 px-5 py-2 w-full flex flex-row">
            <div class="avatar w-12 pr-2">
              <div class="rounded-full">
                <img :src="question.author.getUserUrl()" />
              </div>
            </div>
            <div>
              <p class="text-lg">{{ question.author.email }}</p>
              {{ `Clout: ${question.author.score}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-actions flex-row px-10">
      <p>Tags:</p>
      <p class="text-secondary px-2" v-for="tag in question.tags">{{ `#${tag.identifier}` }}</p>
    </div>
  </div>
</template>
