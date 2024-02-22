import { defineStore } from "pinia";
import { ref } from "vue";
import { Activity } from "@/models/activity";
import taskService from "../services/taskService";

export const useActivityStore = defineStore("activity", () => {
  const activities = ref<Activity[]>([]);

  function updateActivities(userId: string) {
    taskService
      .fetchActivities(userId)
      .then((res: Activity[]) => (activities.value = res))
      .catch((err) => console.error(err));
  }

  return { activities, updateActivities };
});
