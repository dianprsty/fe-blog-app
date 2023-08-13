import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import PostsView from "../views/PostsView.vue";
import CreatePostsView from "../views/CreatePostsView.vue";
import UpdatePostsView from "../views/UpdatePostsView.vue";
import PostDetailView from "../views/PostDetailView.vue";
import MyPostsView from "../views/MyPostsView.vue";
import { useAuthStore } from "../stores/authStore";
import { useModalStore } from "../stores/modal";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/auth/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/posts",
      name: "posts",
      component: PostsView,
    },
    {
      path: "/posts/create",
      name: "Create Post",
      component: CreatePostsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/posts/edit/:id",
      name: "Edit Post",
      component: UpdatePostsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/posts/:id",
      name: "Post Detail",
      component: PostDetailView,
    },
    {
      path: "/posts/my-posts",
      name: "My Posts",
      component: MyPostsView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  const { isLogin } = useAuthStore();
  const modal = useModalStore();
  if (!to.name) {
    modal.openModal(`Not Found`, "The Page Isn't available yet");
    setTimeout(() => {
      modal.closeModal();
    }, 5000);
    return { name: "home" };
  }
  if (to.meta.requiresAuth && !isLogin) {
    modal.openModal(
      `Can't acces ${to.name} page`,
      "You must login to access this page"
    );
    setTimeout(() => {
      modal.closeModal();
    }, 5000);
    return { name: "home" };
  }

  if (to.path.startsWith("/auth/") && isLogin) {
    modal.openModal(
      `Can't acces ${to.name} page`,
      "Authentication pages can't be accessed when you're already login"
    );
    setTimeout(() => {
      modal.closeModal();
    }, 5000);
    return { name: "home" };
  }
});

export default router;
