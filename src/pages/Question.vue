<script setup lang="ts">
import { useRoute } from "vue-router";
import { QuestionsService } from "../services/questions.service";

const route = useRoute();

const question = QuestionsService.instance.get(route.params.question);
</script>

<template>
  <p>Question page</p>
</template>
