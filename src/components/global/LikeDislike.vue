<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { Question } from "../../models/Question.model";
import { QuestionsService } from "../../services/questions.service";

const props = defineProps({ question: { required: true, type: Question } });

const likeStatus = ref<Boolean | null>(null);

async function addLike() {
  if (likeStatus.value == true) return;
  const ok = await QuestionsService.instance.voteQuestion(props.question.id, 1);
  if (!ok) return;
  if (likeStatus.value == false) props.question.clout++;

  likeStatus.value = true;
  props.question.clout++;
}
async function addDislike() {
  if (likeStatus.value == false) return;
  const ok = await QuestionsService.instance.voteQuestion(props.question.id, -1);
  if (!ok) return;
  if (likeStatus.value == true) props.question.clout--;
  likeStatus.value = false;
  props.question.clout--;
}

const isLiked = computed(() => {
  return likeStatus.value != null && likeStatus.value == true;
});
const isDisliked = computed(() => {
  return likeStatus.value != null && likeStatus.value == false;
});

onMounted(async () => {
  likeStatus.value = await QuestionsService.instance.findVoteQuestion(props.question.id);
});
</script>

<template>
  <div class="flex flex-col items-center p-2">
    <button class="btn btn-ghost m-1 btn-xs" @click="addLike()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" :class="{ 'text-secondary': isLiked }">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
    <p :class="{ 'text-secondary': isLiked, 'text-primary': isDisliked }">{{ question.clout }}</p>
    <button class="btn btn-ghost m-1 btn-xs" @click="addDislike()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" :class="{ 'text-primary': isDisliked }">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
</template>
