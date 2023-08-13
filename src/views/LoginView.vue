<template>
  <div
    class="flex items-center justify-center w-full h-screen p-4 bg-slate-200"
  >
    <div
      class="relative flex flex-col w-full max-w-sm gap-4 p-12 bg-white rounded-md shadow-lg"
    >
      <div class="absolute top-0 left-0 p-4">
        <RouterLink
          to="/"
          class="flex flex-row gap-2 text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900 hover:font-bold"
        >
          <span aria-hidden="true"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </span>
          <span> Home </span>
        </RouterLink>
      </div>
      <LoginFormComponent />
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import LoginFormComponent from "../components/LoginFormComponent.vue";
</script>
