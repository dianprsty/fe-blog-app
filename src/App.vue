<script setup>
import { RouterView, useRoute } from "vue-router";
import NavBarComponent from "./components/NavBarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { usePostStore } from "./stores/posts";
import ModalComponent from "./components/ModalComponent.vue";
import CreateArticleFloatingButton from "./components/CreateArticleFloatingButton.vue";
import LoadingIndicatorComponent from "./components/LoadingIndicatorComponent.vue";

const postStore = usePostStore();
const authStore = useAuthStore();

onMounted(async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    user = {};
  }
  authStore.setAuthCredential(user);
  await postStore.getPost();
});
</script>

<template>
  <ModalComponent />
  <NavBarComponent v-if="!$route.path.startsWith('/auth/')" />
  <RouterView />
  <FooterComponent v-if="!$route.path.startsWith('/auth/')" />
  <CreateArticleFloatingButton
    v-if="!['Create Post', 'Edit Post'].includes($route.name)"
  />
  <LoadingIndicatorComponent v-if="postStore.loading.isLoading" />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap");

*,
*::after,
::before {
  font-family: "Montserrat";
}
</style>
