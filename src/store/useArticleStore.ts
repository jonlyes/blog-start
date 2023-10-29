import { shallowRef } from "vue";
import { defineStore } from "pinia";

const useArticleStore = defineStore(
  "article",
  () => {
    const articleTitle = shallowRef<string>();
    const articleContent = shallowRef<string>();


    return {
      articleTitle,
      articleContent,
    };
  },
  {
    persist: {
      key: "articleStore",
      storage: sessionStorage,
    },
  }
);

export default useArticleStore;
