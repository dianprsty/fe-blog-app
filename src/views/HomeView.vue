<template>
  <main>
    <div
      class="flex flex-col-reverse items-center justify-between w-10/12 min-h-screen m-auto xl:min-h-0 md:flex-row"
    >
      <div class="flex flex-col w-full md:w-6/12 xl:-mt-16">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Dian Prasetyo's Blog
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Dian's Blog allow you to create a blog post and read other people
          blog. Write your though and oppinion here and let others know it!
        </p>
        <div class="flex items-center justify-start mt-10 gap-x-6">
          <RouterLink
            to="/posts"
            class="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Get started <span aria-hidden="true">→</span></RouterLink
          >
        </div>
      </div>
      <div class="flex justify-end w-full md:w-6/12">
        <img
          src="/hero-image.png"
          alt="hero-image"
          class="motion-reduce:animate-bounce"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
