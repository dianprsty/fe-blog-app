<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmitForm">
    <div v-if="isShowError" class="p-4 rounded-lg bg-rose-300">
      <ul>
        <li class="text-sm text-rose-700" v-for="error in errorOnSubmit">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-between mt-2">
      <h1 class="text-4xl font-bold text-black">Update Post</h1>
      <button
        type="submit"
        :disabled="postStore.loading.isLoading"
        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <span v-if="postStore.loading.isLoading"> Processing... </span>
        <span v-else> Update</span>
      </button>
    </div>
    <div>
      <label class="block" for="title">
        <span class="block text-sm font-medium text-slate-700">Title</span>
        <input
          placeholder="title"
          v-model="postStore.post.title"
          id="title"
          required
          class="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:text-slate-800"
        />
      </label>
    </div>
    <div>
      <label class="block" for="content">
        <span class="block text-sm font-medium text-slate-700">Content</span>
      </label>
      <Editor
        api-key="t5n49s9tn5kfe9n6dl38k7x49n05u3ys2abkt3uo20s517hp"
        :init="{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          file_picker_types: 'image',
          image_upload_url: { location: '/images' },
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | image help',
        }"
        v-model="postStore.post.content"
      />
    </div>
  </form>
</template>
<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { usePostStore } from "../stores/posts";
import { useAuthStore } from "../stores/authStore";
import { useModalStore } from "../stores/modal";
import Editor from "@tinymce/tinymce-vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { authCredential } = useAuthStore();
const postStore = usePostStore();
const modal = useModalStore();

const isShowError = ref(false);

const errorOnSubmit = ref([]);

const onSubmitForm = async () => {
  errorOnSubmit.value = [];
  if (errorOnSubmit.value.length > 0) {
    isShowError.value = true;
    setTimeout(() => {
      isShowError.value = false;
    }, 5000);
  }
  try {
    await postStore.updatePost();
    postStore.getPost();
  } catch (error) {
    errorOnSubmit.value.push("Update post failed");
    isShowError.value = true;
    setTimeout(() => {
      isShowError.value = false;
    }, 5000);
  }
};

// onBeforeMount(async () => {});

onBeforeMount(async () => {
  await postStore.getPost();

  let postData = postStore.posts.data.find(
    (item) => item.id == route.params.id
  );
  if (postData.author != authCredential.user.email) {
    router.push("/");
    modal.openModal(`Can't acces page`, "You don'n have access to this page");
    setTimeout(() => {
      modal.closeModal();
    }, 5000);
    return;
  }

  postStore.setCurrentPosts(postData);
});

onUnmounted(() => {
  postStore.post.id = "";
  postStore.post.author = "";
  postStore.post.title = "";
  postStore.post.content = "";
});
</script>
<style scoped></style>
