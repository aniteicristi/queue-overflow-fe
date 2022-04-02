<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../../services/auth.service";

const email = ref("");
const pass = ref("");
const error = ref("");
const router = useRouter();

const awaiting = ref(false);

async function login() {
  if (awaiting.value) return;
  error.value = "";
  awaiting.value = true;
  const result = await AuthService.instance.login(email.value, pass.value);
  awaiting.value = false;
  console.log(result);

  if (result == 401) {
    error.value = "ERROR: Credentials are wrong. Please try again";
    return;
  }
  if (result == 201) {
    router.push("/");
  }
}
</script>

<template>
  <div class="card card-side lg:w-1/4 md:w-1/2 sm:w-full h-80 px-10 bg-base-100 flex flex-col items-center justify-evenly">
    <h1 class="card-title self-start text-xl">Login</h1>
    <input type="email" placeholder="Email..." class="input input-bordered input-primary w-full" v-model="email" />
    <input type="password" placeholder="Password..." class="input input-bordered input-primary w-full" v-model="pass" />
    <p class="text-error self-start">{{ error }}</p>
    <div class="card-actions justify-end w-full">
      <button class="btn btn-primary" :class="{ loading: awaiting, 'btn-disabled': awaiting }" @click="login()">Login</button>
    </div>
  </div>
</template>
