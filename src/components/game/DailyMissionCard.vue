<template>
	<div
		@click="dailyMission.isCompleted ? '' : startMission()"
		title="Mission Starten."
		class="w-full opacity-95 max-w-[20rem] min-w-[20rem] h-fit relative card card-compact transition-all border duration-200 bg-gradient-to-br shadow-lg hover:shadow-xl cursor-pointer"
		:class="
			props.dailyMission.isCompleted
				? 'border-emerald-100 hover:bg-emerald-50 from-emerald-100 to-transparent bg-white'
				: 'border-indigo-100 hover:bg-indigo-50 from-indigo-50 to-transparent bg-white'
		">
		<div class="flex flex-col w-full card-body">
			<MaterialIcon
				v-if="dailyMission.isCompleted"
				class="absolute w-6 h-6 -right-2.5 -top-2.5 text-emerald-500 shadow-md bg-white rounded-full"
				:icon="mdiCheckCircle" />

			<h2 class="card-title text-base text-indigo-700">{{ dailyMission.name }}</h2>
			<p class="flex text-sm break-all overflow-hidden">
				{{ dailyMission.description }}
			</p>
			<div class="card-actions justify-end text-sm">
				<MaterialIcon class="w-6 h-6 ml-auto mt-auto text-indigo-600" :icon="mdiSeal" />
				<div class="flex my-auto">
					<span class="mr-2">Belohnung: </span>
					<div class="flex font-medium text-indigo-600">
						<span>{{ dailyMission.rewardAmount }}</span>

						<img
							v-if="dailyMission.resourceType == ResourceTypes.ManaPotion"
							class="w-6 object-cover"
							src="@/assets/game/resources/ManaPotion.webp"
							alt="'Mana'" />
						<img
							v-else-if="dailyMission.resourceType == ResourceTypes.PixelDust"
							class="w-6 object-cover"
							src="@/assets/game/resources/PixelDust.webp"
							alt="'PixelDust'" />
						<img
							v-else-if="dailyMission.resourceType == ResourceTypes.StaminaPotion"
							class="w-6 object-cover"
							src="@/assets/game/resources/StaminaPotion.webp"
							alt="'Stamina'" />

						<span class="pl-1" v-else>xp</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import DailyMission from "@/models/dailyMissions";
import { mdiCheckCircle, mdiSeal } from "@mdi/js";

import { MessageType, ResourceTypes, TaskType } from "@/models/enums";
import messageService from "@/services/messageService";
import { useExtensionStore } from "@/stores/extensionStore";
import { useNotificationStore } from "@/stores/notificationStore";
import MaterialIcon from "../app/MaterialIcon.vue";

const props = defineProps<{ dailyMission: DailyMission }>();
const extensionStore = useExtensionStore();
const notificationStore = useNotificationStore();

function startMission() {
	messageService
		.setActiveTaskByTaskType(extensionStore.extensionId, props.dailyMission.designatedTaskType, '')
		.then(() => {
			if (props.dailyMission.designatedTaskType == TaskType.TimingTask)
				window.open(props.dailyMission.location?.url, "_blank");

			window.open(props.dailyMission.location?.url, "_blank");
		})
		.catch(() => notificationStore.addNotification("Aufgabe konnte nicht gestartet werden.", MessageType.Error));
}
</script>
