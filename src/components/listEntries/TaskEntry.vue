<template>
	<div
		v-if="task.task.taskType != TaskType.ExploringTask"
		@click="task.isUnlocked ? (taskStore.activeTask = task) : ''"
		:class="`${isSelected ? 'border-indigo-700 bg-green-50' : 'border-transparent'} ${
			task.isUnlocked ? 'bg-white hover:bg-indigo-50 cursor-pointer ' : 'bg-gray-100'
		} border-2 relative z-10 flex p-2`">
		<div :class="`mx-auto w-full group transition-colors duration-150 flex p-2 h-full max-h-24 gap-x-4`">
			<div class="text-left my-auto max-w-sm">
				<h3 class="font-semibold text-base">{{ task.task.name }}</h3>
				<div class="text-sm">{{ task.task.description }}</div>
				<div class="text-xs text-indigo-500">{{ reward }}</div>
			</div>
		</div>
		<div
			v-if="!task.isUnlocked"
			class="my-auto mr-4"
			title="Um diese Aufgabe freizuschalten müssen Sie oder andere Spieler die Erreichbarkeitsaufgabe abschließen.">
			<MaterialIcon class="text-gray-400 w-6 h-6" :icon="mdiInformationOutline" />
		</div>
		<div v-if="isSelected" class="my-auto mr-4">
			<MaterialIcon class="text-green-500 w-6 h-6" :icon="mdiCheckCircleOutline" />
		</div>
	</div>
</template>

<script setup lang="ts">
import LocationTask from "@/models/locationTask";
import MaterialIcon from "../app/MaterialIcon.vue";
import { mdiCheckCircleOutline, mdiInformationOutline } from "@mdi/js";
import { useTaskStore } from "@/stores/taskStore";
import { computed } from "vue";
import { TaskType } from "@/models/enums";

const props = defineProps<{ task: LocationTask }>();

const taskStore = useTaskStore();
const isSelected = computed(() => props.task.id === taskStore.activeTask?.id);

const reward = computed(() => {
	switch (props.task.task.taskType) {
		case TaskType.TimingTask:
			return "Belohnt Sie mit Punkten und Erfahrung";
		case TaskType.ScoutingTask:
			return "Belohnt Sie mit Punkten und Erfahrung";
		case TaskType.SemanticTask:
			return "Belohnt Sie mit zufälligen Resourcen";
		default:
			return "Diese Aufgabe trägt zu der Verteigung bei.";
	}
});
</script>
