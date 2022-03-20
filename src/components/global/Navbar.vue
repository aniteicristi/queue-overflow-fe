<script lang="ts">
import { computed, defineComponent } from "vue";
import { RouterLink } from "vue-router";
export default defineComponent({});
</script>

<template>
  <div class="navbar bg-slate-800 p-3 items-center">
    <div class="bg-base-100 rounded-xl p-2 flex-auto">
      <router-link to="/" class="flex-1">
        <div>
          <button class="btn btn-ghost text-lg">QUEUE OVERFLOW</button>
        </div>
      </router-link>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input type="text" placeholder="Search..." class="input input-bordered" />
        </div>
      </div>
      <div class="dropdown dropdown-end ml-5">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://ui-avatars.com/api/?background=1E313B&color=fff&name=Jojo" />
          </div>
        </label>

        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <router-link to="/profile">Profile</router-link>
          </li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
