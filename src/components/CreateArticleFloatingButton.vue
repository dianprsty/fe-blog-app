<template>
  <div
    v-if="authStore.isLogin"
    class="fixed flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full shadow-xl hover:bg-indigo-600 animate-bounce shadow-indigo-500 bottom-4 md:bottom-10 xl:bottom-14 right-8"
  >
    <button @click="router.push('/posts/create')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8 font-extrabold text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </div>
</template>
<script setup>
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
</script>
