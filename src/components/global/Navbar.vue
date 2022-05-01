<script setup lang="ts">
import { RouterLink } from "vue-router";
import { AuthService } from "../../services/auth.service";
import { useRouter } from "vue-router";
import { computed, onMounted, Ref, ref } from "vue";
import { User } from "../../models/User.model";
import { UserService } from "../../services/users.service";

const router = useRouter();

const loggedIn = computed(() => AuthService.instance.isLoggedIn.value);

function logout() {
  AuthService.instance.logout();
  loggedUser.value = null;
  location.reload();
}

function goToSelfProfile() {
  router.push({ name: "Profile", params: { user: loggedUser.value?.id } });
}

const loggedUser: Ref<User | null> = UserService.instance.currentUser;
</script>

<template>
  <div class="navbar bg-transparent p-3 items-center w-full">
    <div class="bg-base-200 rounded-xl p-2 flex-auto">
      <router-link to="/" class="flex-1">
        <div>
          <button class="btn btn-ghost text-lg">QUEUE OVERFLOW</button>
        </div>
      </router-link>

      <div class="dropdown dropdown-hover dropdown-end ml-5" v-if="loggedIn">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar" v-if="loggedUser != null">
          <div class="w-10 rounded-full">
            <img :src="loggedUser.getUserUrl()" />
          </div>
        </label>

        <ul tabindex="0" class="p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li @click="goToSelfProfile()"><a>Profile</a></li>
          <li @click="logout()"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
