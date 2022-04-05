<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { User, UserRole } from "../models/User.model";
import { UserService } from "../services/users.service";

const currentUser = ref<User | null | undefined>(null);

const isBanned = computed(() => currentUser.value?.role == UserRole.BANNED);
const isAdmin = computed(() => currentUser.value?.role == UserRole.MODERATOR);

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
          <h2 class="text-xl" :class="{ 'text-red-700': isBanned, 'text-green-700': isAdmin }">{{ "Role : " + currentUser.role.toUpperCase() }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
