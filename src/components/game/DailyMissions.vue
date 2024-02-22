<template>
	<div
		id="daily-missions"
		class="flex flex-col gap-y-4 absolute top-28 left-4 z-20 transition-all h-auto duration-300 ease-linear">
		<div
			class="bg-white p-2 rounded-md opacity-95 w-[20rem] font-medium text-indigo-700 shadow-md flex cursor-pointer"
			@click="toggleExpand()">
			Tägliche Missionen: {{ !expanded ? "Ausklappen" : "Einklappen" }}
			<span class="ml-auto">
				<MaterialIcon class="w-6 h-6 ml-auto" :icon="expanded ? mdiMenuLeft : mdiMenuDown"
			/></span>
		</div>
		<ul v-if="expanded" class="flex flex-col gap-y-4 transition-all">
			<li v-for="mission in dailyMissions">
				<DailyMissionCard :daily-mission="mission" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useDailyMissionStore } from "@/stores/dailyMissionStore";
import { ref, computed, onMounted } from "vue";
import DailyMissionCard from "./DailyMissionCard.vue";
import MaterialIcon from "../app/MaterialIcon.vue";
import { mdiMenuDown, mdiMenuLeft } from "@mdi/js";

const dailyMissionStore = useDailyMissionStore();
const dailyMissions = computed(() => dailyMissionStore.dailyMissions);
const expanded = ref<boolean>(true);

function toggleExpand() {
	expanded.value = !expanded.value;
}

onMounted(() => {
	dailyMissionStore.updateDailyMissions();
});
</script>
