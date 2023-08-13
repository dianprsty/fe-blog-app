<template>
  <div
    class="flex flex-col items-center justify-start px-8 mb-12 bg-slate-100 min-h-[90vh]"
  >
    <div class="flex items-center justify-between w-full">
      <p class="py-8 text-4xl font-bold text-start text-slate-900">My Posts</p>
      <div>
        <RouterLink
          to="/posts/create"
          class="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Create Post</RouterLink
        >
      </div>
    </div>
    <div
      class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div v-if="myPosts.length == 0">
        <p class="w-full mt-6 text-lg text-center text-gray-600">
          You Post is Empty
        </p>
      </div>
      <div
        v-for="item in myPosts"
        class="flex flex-col justify-between p-4 bg-white border shadow-md border-slate-200"
      >
        <div class="justify-start mb-8">
          <p
            class="mb-4 text-xl font-bold text-slate-900 line-clamp-2 text-ellipsis"
          >
            {{ item.title }}
          </p>
          <p
            class="inline float-none px-2 py-1 text-xs rounded-full bg-blue-50"
          >
            by : {{ item.author }}
          </p>
          <p class="text-ellipsis line-clamp-4" v-html="item.content"></p>
        </div>
        <div class="flex items-center justify-between mt-10 gap-x-6">
          <div class="flex gap-2">
            <button
              class="px-4 py-2 text-sm bg-green-400 rounded-md"
              @click="goToEdit(item)"
            >
              Edit
            </button>
            <button
              class="px-4 py-2 text-sm rounded-md bg-rose-400"
              @click="postStore.deletePost(item.id)"
            >
              Delete
            </button>
          </div>
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
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { usePostStore } from "../stores/posts";
import { useAuthStore } from "../stores/authStore";

const postStore = usePostStore();
const authStore = useAuthStore();
const router = useRouter();
const myPosts = computed(() => {
  let newPosts = postStore.posts.data.filter(
    (item) => item.author == authStore.authCredential.user.email
  );
  return newPosts;
});

const goToEdit = (postData) => {
  postStore.setCurrentPosts(postData);
  router.push(`/posts/edit/${postData.id}`);
};
</script>
