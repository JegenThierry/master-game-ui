import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./userStore";
import { useNotificationStore } from "./notificationStore";
import { MessageType } from "@/models/enums";
import UserUnlockables from "@/models/userUnlockable";
import userUnlockablesService from "@/services/userUnlockablesService";

export const useUnlockablesStore = defineStore("userUnlockables", () => {
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const userUnlockables = ref<UserUnlockables[]>();

  function updateUserUnlockables() {
    const userId = userStore.activeUser.value?.uid ?? "";
    userUnlockablesService
      .fetchUserUnlockables(userId)
      .then((res: UserUnlockables[]) => (userUnlockables.value = res))
      .catch(() =>
        notificationStore.addNotification(
          "Unlockables konnten nicht geladen werden.",
          MessageType.Error
        )
      );
  }

  return { userUnlockables, updateUserUnlockables };
});
