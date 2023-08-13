<template>
  <div class="w-full bg-slate-100">
    <div class="p-8 m-auto bg-white md:w-10/12 lg:w-8/12 min-h-[90vh] mb-10">
      <div
        class="flex justify-end gap-2"
        v-if="currentPost.author == authStore.authCredential.user.email"
      >
        <button
          class="px-4 py-2 text-sm bg-green-400 rounded-md"
          @click="goToEdit(currentPost)"
        >
          Edit
        </button>
        <button
          class="px-4 py-2 text-sm rounded-md bg-rose-400"
          @click="postStore.deletePost(currentPost.id)"
        >
          Delete
        </button>
      </div>
      <h1
        class="text-2xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl"
      >
        {{ currentPost.title }}
      </h1>
      <p class="text-sm leading-8 text-center text-gray-600">
        by : {{ currentPost.author }}
      </p>
      <p
        class="text-base leading-8 text-slate-900"
        v-html="currentPost.content"
      ></p>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted, watch, ref } from "vue";
import { usePostStore } from "../stores/posts";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const postStore = usePostStore();
const currentPost = reactive({
  id: "",
  author: "",
  title: "",
  content: "",
  createdAt: "",
  updatedAt: "",
});

const goToEdit = (postData) => {
  postStore.setCurrentPosts(postData);
  router.push(`/posts/edit/${postData.id}`);
};

onMounted(async () => {
  await postStore.getPost();

  let postData = postStore.posts.data.find(
    (item) => item.id == route.params.id
  );

  if (postData) {
    for (let key in currentPost) {
      currentPost[key] = postData[key];
    }
  }
});
</script>
