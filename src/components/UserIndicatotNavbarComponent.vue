<template>
  <div>
    <Menu
      as="div"
      class="relative inline-block p-2 text-left bg-white rounded-lg hover:bg-slate-200"
    >
      <div>
        <MenuButton
          class="inline-flex items-center justify-center w-full text-sm font-medium rounded-md text-slate-800"
        >
          <div class="p-1 rounded-full bg-slate-300">
            <UserIcon class="w-6 h-6 -mb-1" />
          </div>
          <p class="mx-2">{{ authStore.authCredential.user.email }}</p>
          <ChevronDownIcon class="w-4 h-4 -mb-1" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="onLogout"
                :class="[
                  active ? 'bg-indigo-300 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <ArrowRightOnRectangleIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-indigo-700"
                  aria-hidden="true"
                />
                Logout
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <RouterLink
                to="/posts/my-posts"
                :class="[
                  active ? 'bg-indigo-300 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <DocumentTextIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-indigo-700"
                  aria-hidden="true"
                />
                My Posts
              </RouterLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { RouterLink } from "vue-router";
import {
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/authStore";
import { useModalStore } from "../stores/modal";

const authStore = useAuthStore();
const modal = useModalStore();
const onLogout = async () => {
  await authStore.logout();
  modal.openModal("Logout Succesfull", "");
  setTimeout(() => {
    modal.closeModal();
  }, 5000);
};
</script>
