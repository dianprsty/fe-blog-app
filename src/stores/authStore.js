import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", () => {
  const router = useRouter();
  const authCredential = reactive({
    user: {},
  });

  const isLogin = computed(() => {
    if (authCredential.user.email !== undefined) return true;

    return false;
  });

  const setAuthCredential = (user) => {
    authCredential.user = { ...authCredential.user, ...user };
  };

  const logout = async () => {
    await signOut(auth);
    authCredential.user = {};
    localStorage.removeItem("user");
    await router.push("/");
  };

  return { authCredential, setAuthCredential, isLogin, logout };
});
