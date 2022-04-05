<script setup lang="ts">
import { onMounted, ref } from "vue";
import { User } from "../models/User.model";
import { UserService } from "../services/users.service";

const currentUser = ref<User | null | undefined>(null);

onMounted(async () => {
  currentUser.value = await UserService.instance.getCurrentUser();
});
</script>

<template>
  <div class="w-screen flex flex-row justify-center">
    <div v-if="currentUser != null && currentUser != undefined" class="card card-compact w-2/3 bg-base-200 p-5">
      <div class="card-body flex flex-row align-middle">
        <div class="avatar">
          <div class="rounded-full w-52">
            <img :src="currentUser.getUserUrl()" />
          </div>
        </div>
        <div class="flex flex-col my-auto">
          <h1 class="text-3xl">{{ currentUser.email }}</h1>
          <h2 class="text-xl">{{ "User clout: " + currentUser.score }}</h2>
          <h2 class="text-xl">{{ "Role : " + currentUser.role.toUpperCase() }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
