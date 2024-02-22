<template>
	<div
		:class="
			props.unlockable.isUnlocked
				? 'border-emerald-100 hover:bg-emerald-50 from-emerald-100 to-transparent bg-white'
				: 'border-indigo-100 hover:bg-indigo-50 from-indigo-50 to-transparent bg-white'
		"
		class="w-96 h-36 relative card card-compact card-side transition-all border duration-200 bg-gradient-to-br shadow-lg hover:shadow-xl">
		<div class="flex flex-col p-4 gap-y-4 overflow-hidden">
			<!-- <MaterialIcon v-if="isActive" class="absolute w-7 h-7 -right-3 -top-3 text-emerald-500" :icon="mdiCheckCircle" /> -->
			<div
				class="radial-progress rounded-full overflow-hidden aspect-square text-indigo-600 m-auto"
				:title="`Fortschritt liegt bei: ${progress}`"
				:style="{ '--value': `${progress}`, '--thickness': '0.25rem', '--size': '6rem' }"
				role="progressbar">
				<img
					class="w-full rotate-12 p-2 object-contain h-full rounded-full object-center pr-1.5"
					:class="unlockable.isUnlocked ? 'saturate-100' : 'saturate-0'"
					loading="lazy"
					:src="computeImage"
					alt="Unlockable Icon" />
			</div>
		</div>
		<div class="card-body max-w-[16rem] w-full">
			<h2 class="card-title text-base">{{ unlockable.name }}</h2>
			<p class="text-sm">
				{{ description }}
			</p>
			<div class="card-actions justify-end text-sm">
				<MaterialIcon class="w-6 h-6 mt-auto text-indigo-600" :icon="mdiSeal" />
				<span
					>Belohnung: <span class="font-medium text-indigo-600">{{ expReward }} xp</span></span
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MaterialIcon from "../app/MaterialIcon.vue";
import { mdiCheckCircle, mdiSeal } from "@mdi/js";
import { computed, ref } from "vue";
import { AchievementDifficulty, UnlockablesReward } from "@/models/enums";
import UserUnlockables from "@/models/userUnlockable";
import markerCommonImage from "@/assets/game/unlockables/MarkerCommon.webp";
import markerGreenPinkImage from "@/assets/game/unlockables/MarkerCommon.webp";
import markerRainbowImage from "@/assets/game/unlockables/MarkerCommon.webp";
import markerRareImage from "@/assets/game/unlockables/MarkerCommon.webp";
import markerSuperRareImage from "@/assets/game/unlockables/MarkerCommon.webp";

const props = defineProps<{ unlockable: UserUnlockables }>();
const isActive = ref<boolean>(false);

const description = computed(() => {
	const desc = props.unlockable.unlockable.description;
	if (desc == undefined || desc == "") return "Es liegt keine Beschreibung für das Achievement vor.";

	return desc;
});

const computeImage = computed(() => {
	switch (props.unlockable.unlockable.reward) {
		case UnlockablesReward.MarkerCommon:
			return markerCommonImage;
		case UnlockablesReward.MarkerGreenPink:
			return markerGreenPinkImage;
		case UnlockablesReward.MarkerRainbow:
			return markerRainbowImage;
		case UnlockablesReward.MarkerRare:
			return markerRareImage;
		case UnlockablesReward.MarkerSuperRare:
			return markerSuperRareImage;
	}
});

const expReward = computed(() => {
	switch (props.unlockable.unlockable.difficulty) {
		case AchievementDifficulty.Easy:
			return 5;
		case AchievementDifficulty.Medium:
			return 10;
		case AchievementDifficulty.Hard:
			return 20;
	}
});

function selectItem() {
	if (props.unlockable.isUnlocked) isActive.value = true;
}

const progress = computed(() => {
	if (props.unlockable.unlockable.neededValue == 0) return 0;
	return Math.floor((props.unlockable.currentValue / props.unlockable.unlockable.neededValue) * 100);
});
</script>
