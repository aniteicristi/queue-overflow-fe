<script setup lang="ts">
import Navbar from "./components/global/Navbar.vue";
</script>

<template>
  <div class="flex w-screen flex-col h-screen items-center">
    <Navbar />
    <router-view class="flex-grow w-11/12"></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: rgb(30 41 59);
  min-height: 100%;
}
</style>
