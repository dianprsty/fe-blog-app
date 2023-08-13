<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmitForm">
    <div v-if="isShowError" class="p-4 rounded-lg bg-rose-300">
      <ul>
        <li class="text-sm text-rose-700" v-for="error in errorInputValidation">
          {{ error }}
        </li>
        <li class="text-sm text-rose-700" v-for="error in errorOnSubmit">
          {{ error }}
        </li>
      </ul>
    </div>
    <h1 class="text-lg font-bold text-center md:text-2xl">Login</h1>
    <div>
      <label class="block">
        <span class="block text-sm font-medium text-slate-700"
          >Email<span class="text-rose-500">*</span></span
        >
        <input
          type="email"
          placeholder="Email"
          v-model="input.email"
          required
          class="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:text-slate-800"
        />
      </label>
    </div>
    <div>
      <label class="block" for="password">
        <span class="block text-sm font-medium text-slate-700"
          >Password<span class="text-rose-500">*</span></span
        >
      </label>
      <div class="relative">
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="input.password"
          name="password"
          id="password"
          placeholder="Password"
          minlength="8"
          required
          class="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:text-slate-700"
        />
        <div
          class="absolute top-0 right-0 z-20 h-full p-2 cursor-pointer"
          @click.stop="isPasswordVisible = !isPasswordVisible"
        >
          <svg
            v-if="!isPasswordVisible"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-6 h-6 text-slate-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-6 h-6 text-slate-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-start mt-2">
      <input
        type="submit"
        value="Login"
        class="rounded-md w-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      />
    </div>
    <div>
      <p class="text-sm text-center">
        Don't Have Account?
        <span class="text-blue-500"
          ><RouterLink to="/auth/register">Register</RouterLink></span
        >
      </p>
    </div>
  </form>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import { auth, db } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const { setAuthCredential } = useAuthStore();
const router = useRouter();
const isPasswordVisible = ref(false);

const input = reactive({
  email: "",
  password: "",
});

const isShowError = ref(false);

const errorInputValidation = computed(() => {
  let err = [];
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
  if (input.email.length == 0) err.push("email tidak boleh kosong");
  if (!emailRegex.test(input.email)) err.push("format email salah");
  if (input.password.length == 0) err.push("password tidak boleh kosong");
  if (input.password < 8) err.push("password minimal 8 karakter");

  return err;
});

const errorOnSubmit = ref([]);

const onSubmitForm = async () => {
  errorOnSubmit.value = [];
  if (errorInputValidation.value.length > 0 || errorOnSubmit.value.length > 0) {
    isShowError.value = true;
    setTimeout(() => {
      isShowError.value = false;
    }, 5000);
    return;
  }
  await signInWithEmailAndPassword(auth, input.email, input.password)
    .then((userCredential) => {
      const user = userCredential.user;
      setAuthCredential(user);
      localStorage.setItem("user", JSON.stringify(user));
      input.email = "";
      input.password = "";
      input.passwordConfirmation = "";
      router.push("/");
    })
    .catch((error) => {
      errorOnSubmit.value.push("Email atau Password Salah");
      isShowError.value = true;
      setTimeout(() => {
        isShowError.value = false;
      }, 5000);
    });
};
</script>
<style scoped></style>
