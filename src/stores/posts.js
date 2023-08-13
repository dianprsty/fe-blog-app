import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { db } from "../config/firebaseConfig";
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "../../node_modules/firebase/firestore";
import { useModalStore } from "./modal";
import { useRouter } from "vue-router";
export const usePostStore = defineStore("post", () => {
  const router = useRouter();
  const posts = reactive({
    data: [],
  });

  const post = reactive({
    id: "",
    author: "",
    title: "",
    content: "",
  });

  const loading = reactive({
    isLoading: false,
  });

  const setCurrentPosts = (postData) => {
    post.id = postData.id;
    post.author = postData.author;
    post.title = postData.title;
    post.content = postData.content;
  };

  const clearCurrentPosts = () => {
    post.id = "";
    post.author = "";
    post.title = "";
    post.content = "";
  };

  const getPost = async () => {
    loading.isLoading = true;
    try {
      let tempPostData = [];
      const querySnapshot = await getDocs(
        query(collection(db, "article"), orderBy("createdAt", "desc"))
      );

      querySnapshot.forEach((doc) => {
        let postData = { id: doc.id, ...doc.data() };
        tempPostData.push(postData);
      });

      posts.data = tempPostData;
    } catch (error) {
      console.log(error);
    } finally {
      loading.isLoading = false;
    }
  };

  const createPost = async (author) => {
    loading.isLoading = true;
    try {
      await addDoc(collection(db, "article"), {
        author: author,
        title: post.title,
        content: post.content,
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp(),
      });
      post.title = "";
      post.content = "";
      router.push("/posts/my-posts");
    } catch (error) {
      console.log(error);
    } finally {
      loading.isLoading = false;
    }
  };

  const updatePost = async () => {
    loading.isLoading = true;
    try {
      const docRef = doc(db, "article", `${post.id}`);
      const updatePost = await updateDoc(docRef, {
        title: post.title,
        content: post.content,
        updatedAt: serverTimestamp(),
      });
      clearCurrentPosts();
      router.push("/posts/my-posts");
    } catch (error) {
      console.log(error);
    } finally {
      loading.isLoading = false;
    }
  };

  const deletePost = async (id) => {
    loading.isLoading = true;
    const modal = useModalStore();

    try {
      await deleteDoc(doc(db, "article", id));
      modal.openModal(`Delete Success`, `Delete Post data Success`);
      router.push("/posts/my-posts");
    } catch (error) {
      modal.openModal(`Delete Failed`, `Delete Post data failed \n ${error}`);
      console.log(error);
    } finally {
      loading.isLoading = false;
      modal.closeModal();
      getPost();
    }
  };

  return {
    post,
    posts,
    createPost,
    loading,
    getPost,
    deletePost,
    setCurrentPosts,
    clearCurrentPosts,
    updatePost,
  };
});
