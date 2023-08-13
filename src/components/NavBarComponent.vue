<template>
  <header
    class="top-0 flex flex-col justify-between w-full p-2 px-4 bg-white shadow md:p-0 md:sticky md:flex-row md:px-24"
  >
    <div class="flex justify-center h-16 p-2 md:p-4">
      <img src="/logo.png" alt="logo" class="object-cover h-full" />
    </div>
    <div
      class="flex flex-col items-center justify-between gap-2 md:gap-16 md:flex-row"
    >
      <ul class="flex flex-row items-center h-full gap-6 xl:gap-12">
        <RouterLink class="h-full" to="/">
          <li
            class="flex items-center h-full text-sm font-semibold list-none text-slate-900 hover:text-black hover:border-indigo-500 hover:border-b-2"
          >
            Home
          </li>
        </RouterLink>
        <RouterLink class="h-full" to="/posts">
          <li
            class="flex items-center h-full text-sm font-semibold list-none text-slate-900 hover:text-black hover:border-indigo-500 hover:border-b-2"
          >
            Post
          </li>
        </RouterLink>
        <RouterLink class="h-full" to="/about">
          <li
            class="flex items-center h-full text-sm font-semibold list-none text-slate-900 hover:text-black hover:border-indigo-500 hover:border-b-2"
          >
            About
          </li>
        </RouterLink>
      </ul>
    </div>
    <div
      class="flex items-center justify-between gap-4"
      v-if="authStore.isLogin"
    >
      <UserIndicatotNavbarComponent />
    </div>
    <div
      class="flex items-center justify-between gap-4"
      v-if="!authStore.isLogin"
    >
      <RouterLink
        to="/auth/login"
        class="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Login</RouterLink
      >
      <RouterLink
        to="/auth/register"
        class="cursor-pointer rounded-md border border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Register</RouterLink
      >
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import UserIndicatotNavbarComponent from "./UserIndicatotNavbarComponent.vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
</script>
