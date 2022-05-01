<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Tag } from "../../models/Tag.model";
import { QuestionsService } from "../../services/questions.service";
import { TagsService } from "../../services/tags.service";
const emit = defineEmits(["add"]);

const tags = ref(<Tag[]>[]);
const tagString = ref("");
const tagInput = ref(null);
const titleInput = ref("");
const textInput = ref("");

const tagRecommendations = computed(() => {
  return TagsService.instance.tags.value.filter((tag) => tag.identifier.startsWith(tagString.value) && !tags.value.some((tagg) => tagg.identifier == tag.identifier));
});

function removeTag(tag: Tag) {
  tags.value.splice(tags.value.indexOf(tag), 1);
}

function addTag(str: string) {
  tags.value.push(new Tag(str));
  tagString.value = "";
}

function postQuestion() {
  QuestionsService.instance.addQuestion(titleInput.value, textInput.value, tags.value);
  emit("add");
}

onMounted(async () => {
  await TagsService.instance.getAll();
});
</script>

<template>
  <div class="card px-10 py-5 m-10 bg-base-200 shadow-md w-2/3">
    <h1 class="text-3xl">Ask a question:</h1>
    <input type="text" placeholder="Title" class="input w-1/2 mt-5" v-model="titleInput" />
    <textarea placeholder="Question..." class="textarea mt-5" v-model="textInput" />

    <div class="mt-5 inline-flex mb-16">
      <div class="dropdown w-1/3">
        <div class="input-group w-1/3 mb-2">
          <input type="text" placeholder="Add a tag..." class="input input-bordered input-sm" v-model="tagString" />
          <button class="btn btn-sm" @click="addTag(tagString)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        <ul tabindex="0" class="dropdown-content p-3 shadow bg-base-100 rounded-box w-full">
          <li class="ma-5 btn btn-ghost w-full btn-sm flex justify-start" v-for="tag in tagRecommendations.slice(0, 3)" @click="addTag(tag.identifier)">
            <a>{{ tag.identifier }}</a>
          </li>
        </ul>
      </div>
      <div class="flex flex-row">
        <div class="badge badge-secondary m-1 badge-md" v-for="tag in tags">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current hover:bg-base-200 rounded-full bg-opacity-10" @click="removeTag(tag)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          {{ tag.identifier }}
        </div>
      </div>
    </div>
    <div class="card-actions flex flex-row justify-end">
      <button class="btn btn-secondary btn-outline" @click="postQuestion()">Post</button>
    </div>
  </div>
</template>
