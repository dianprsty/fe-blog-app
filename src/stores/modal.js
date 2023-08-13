import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const modalData = reactive({
    isOpen: false,
    title: "",
    body: "",
  });
  const openModal = (paramTitle, paramBody) => {
    modalData.isOpen = true;
    modalData.title = paramTitle;
    modalData.body = paramBody;
  };

  const closeModal = () => {
    modalData.isOpen = false;
    modalData.title = "";
    modalData.body = "";
  };
  return { modalData, openModal, closeModal };
});
