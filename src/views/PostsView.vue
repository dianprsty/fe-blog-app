<template>
  <div
    class="flex flex-col items-center justify-start px-8 mb-12 bg-slate-100 min-h-[90vh]"
  >
    <p class="w-full py-8 text-4xl font-bold text-start text-slate-900">
      Posts Page
    </p>
    <div
      class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div v-if="postStore.posts.data.length == 0">
        <p class="w-full mt-6 text-lg text-center text-gray-600">
          Post is Empty
        </p>
      </div>
      <div
        v-for="item in postStore.posts.data"
        class="flex flex-col justify-between p-4 bg-white border shadow-md border-slate-200"
      >
        <div class="mb-4">
          <p
            class="mb-4 text-xl font-bold text-slate-900 line-clamp-2 text-ellipsis"
          >
            {{ item.title }}
          </p>
          <p class="inline float-none px-2 py-1 text-xs rounded-full">
            by : {{ item.author }}
          </p>
        </div>
        <div class="grow">
          <p class="text-ellipsis line-clamp-4" v-html="item.content"></p>
        </div>
        <div class="flex items-center justify-end gap-x-6">
          <RouterLink
            :to="'/posts/' + item.id"
            class="cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-md hover:font-bold focus-visible:outline"
            >See Detail <span aria-hidden="true">→</span></RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePostStore } from "../stores/posts";
import { RouterLink } from "vue-router";

const postStore = usePostStore();
</script>
