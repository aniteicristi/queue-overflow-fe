<script setup lang="ts">
import Navbar from "./components/global/Navbar.vue";
import QuestionCreateCard from "./components/global/QuestionCreateCard.vue";
import EditAnswerModal from "./components/global/EditAnswerModal.vue";
</script>

<template>
  <div class="flex w-screen flex-col h-screen items-center">
    <Navbar />
    <router-view v-slot="{ Component, route }" class="w-screen overflow-y-auto">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <edit-answer-modal />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-image: linear-gradient(45deg, hsl(var(--s)), hsl(var(--p)));
  min-height: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: hsl(var(--b2, var(--b1)));
}
</style>
