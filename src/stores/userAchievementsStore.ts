import { defineStore } from "pinia";
import { ref } from "vue";
import UserAchievements from "@/models/userAchievements";
import userAchivementsService from "@/services/userAchivementsService";
import { useUserStore } from "./userStore";
import { useNotificationStore } from "./notificationStore";
import { MessageType } from "@/models/enums";

export const useUserAchievementsStore = defineStore("userAchievements", () => {
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const userAchievements = ref<UserAchievements[]>();

  function updateUserAchievements() {
    const userId = userStore.activeUser.value?.uid ?? "";
    userAchivementsService
      .fetchUserAchievements(userId)
      .then((res: UserAchievements[]) => (userAchievements.value = res))
      .catch(() =>
        notificationStore.addNotification(
          "Achievements konnten nicht geladen werden.",
          MessageType.Error
        )
      );
  }

  return { userAchievements, updateUserAchievements };
});
