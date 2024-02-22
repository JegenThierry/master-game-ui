import { defineStore } from "pinia";
import { ref } from "vue";
import DailyMission from "@/models/dailyMissions";
import dailyMissionService from "@/services/dailyMissionService";
import { useNotificationStore } from "./notificationStore";
import { MessageType } from "@/models/enums";
import { useUserStore } from "./userStore";

export const useDailyMissionStore = defineStore("dailyMission", () => {
	const dailyMissions = ref<DailyMission[]>([]);
	const userStore = useUserStore();
	const notificationStore = useNotificationStore();

	function updateDailyMissions() {
		dailyMissionService
			.fetchDailyMissions(userStore.activeUser.value?.uid ?? "")
			.then((res) => (dailyMissions.value = res))
			.catch(() =>
				notificationStore.addNotification("Tägliche Missionen konnten nicht geladen werden.", MessageType.Error)
			);
	}

	return { dailyMissions, updateDailyMissions };
});
