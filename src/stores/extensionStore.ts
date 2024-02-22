import {defineStore} from "pinia";
import {ref} from "vue";

export const useExtensionStore = defineStore("extensions", () => {
    const extensionId = ref<string>("");

    return {extensionId};
});
