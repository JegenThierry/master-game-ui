<template>
	<div
		class="text-white flex fixed bottom-4 left-4 right-4 border-2 border-indigo-700 rounded-lg p-4 cursor-pointer bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-950 opacity-90"
		@click="nextText">
		<div class="flex items-center">
			<img
				v-if="isTutorial"
				class="w-16 h-16 rounded-full mr-4"
				src="@/assets/game/characters/SSO.webp"
				alt="Profile Icon" />
			<img
				v-if="isDailyMessage"
				class="w-16 h-16 rounded-full mr-4"
				src="@/assets/game/characters/Glitch.webp"
				alt="Profile Icon" />
		</div>
		<div class="flex flex-col">
			<div class="text-xl font-bold">Tutorial</div>
			<p class="">{{ activeText }}</p>
		</div>
		<div class="ml-auto mt-auto animate-pulse"><MaterialIcon class="w-5 h-5 -rotate-90" :icon="mdiTriangleDown" /></div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MaterialIcon from "./app/MaterialIcon.vue";
import { mdiTriangleDown } from "@mdi/js";

const props = defineProps<{ messages: string[]; isTutorial: boolean; isDailyMessage: boolean }>();
const emits = defineEmits(["close-box"]);

const activeText = ref<string>(props.messages[0]);
const activeIndex = ref<number>(0);

function nextText() {
	if (activeIndex.value < props.messages.length - 1) {
		activeIndex.value++;
		activeText.value = props.messages[activeIndex.value];
		return;
	}

	updateLocalStorageIfTutorialIsFinished();
}

function updateLocalStorageIfTutorialIsFinished() {
	if (activeIndex.value === props.messages.length - 1 && props.isTutorial) {
		localStorage.setItem("tutorialFinished", "true");
		emits("close-box");
	}

	if (activeIndex.value === props.messages.length - 1 && props.isDailyMessage) {
		//Set date if today in form of YYYY-MM-DD in localstorage
		const date = new Date();
		const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
		localStorage.setItem("dailyMessageComplete", dateString);

		emits("close-box");
	}
}
</script>
