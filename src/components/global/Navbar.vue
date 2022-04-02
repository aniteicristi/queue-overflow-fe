<script setup lang="ts">
import { RouterLink } from "vue-router";
import { AuthService } from "../../services/auth.service";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();

const loggedIn = computed(() => AuthService.instance.isLoggedIn.value);

function logout() {
  AuthService.instance.logout();
  router.replace("/login");
}
</script>

<template>
  <div class="navbar bg-transparent p-3 items-center w-full">
    <div class="bg-base-200 rounded-xl p-2 flex-auto">
      <router-link to="/" class="flex-1">
        <div>
          <button class="btn btn-ghost text-lg">QUEUE OVERFLOW</button>
        </div>
      </router-link>
      <div class="flex-none gap-2" v-if="loggedIn">
        <div class="form-control">
          <input type="text" placeholder="Search..." class="input input-bordered" />
        </div>
      </div>
      <div class="dropdown dropdown-hover dropdown-end ml-5" v-if="loggedIn">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://ui-avatars.com/api/?background=1E313B&color=fff&name=Chi+Chi" />
          </div>
        </label>

        <ul tabindex="0" class="p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <router-link to="/profile">Profile</router-link>
          </li>
          <li @click="logout()"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
