import { defineStore } from "pinia";
import { ref } from "vue";
import { WebPage } from "@/models/webPage";
import webPageService from "../services/webPageService";

export const useWebPageStore = defineStore("webpage", () => {
  const webPages = ref<WebPage[]>();

  function updateWebPages(userId: string) {
    webPageService
      .fetchWebpages(userId)
      .then((res) => (webPages.value = res))
      .catch((err) => console.error(err));
  }

  return { webPages, updateWebPages };
});
