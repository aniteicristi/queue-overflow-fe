<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { Question } from "../../models/Question.model";
import { QuestionsService } from "../../services/questions.service";
import { UserService } from "../../services/users.service";
import LikeDislike from "./LikeDislike.vue";

const props = defineProps({ question: { type: Question, required: true } });
const router = useRouter();

function goToUser(id: number) {
  router.push({ name: "Profile", params: { user: id } });
}

function edit() {
  console.log("not implemented.");
}

function remove() {
  QuestionsService.instance.removeQuestion(props.question.id);
  router.back();
}

const visible = computed(() => UserService.instance.currentUser.value?.role == "moderator");
</script>

<template>
  <div class="card py-5 m-10 bg-base-200 shadow-md w-2/3">
    <div class="card-title flex flex-row justify-end px-5" v-if="visible">
      <button class="btn btn-circle btn-ghost" @click="edit()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <button class="btn btn-circle btn-ghost" @click="remove()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
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
          <div class="card bg-base-300 px-5 py-2 w-full flex flex-row" @click="goToUser(question.author.id)">
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
      <p class="text-secondary px-2" v-for="tag in question.tags">{{ `\$${tag.identifier}` }}</p>
    </div>
  </div>
</template>
