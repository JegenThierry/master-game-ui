<template>
	<div
		class="w-96 h-36 relative card card-compact card-side transition-all border duration-200 bg-gradient-to-br shadow-lg hover:shadow-xl"
		:class="
			props.achievement.isUnlocked
				? 'border-emerald-100 hover:bg-emerald-50 from-emerald-100 to-transparent bg-white'
				: 'border-indigo-100 hover:bg-indigo-50 from-indigo-50 to-transparent bg-white'
		">
		<div class="flex flex-col p-4 gap-y-4 overflow-hidden">
			<div
				class="radial-progress rounded-full overflow-hidden aspect-square text-indigo-600 m-auto"
				:title="`Fortschritt liegt bei: ${progress}`"
				:style="{
					'--value': `${progress}`,
					'--thickness': '0.25rem',
					'--size': '6rem',
				}"
				role="progressbar">
				<img
					class="w-full object-contain h-full rounded-full object-center p-1"
					:class="achievement.isUnlocked ? 'saturate-100' : 'saturate-0'"
					loading="lazy"
					:src="computeImage"
					alt="Achivement Icon" />
			</div>
		</div>
		<div class="card-body max-w-[16rem] w-full">
			<h2 class="card-title text-base">{{ achievement.name }}</h2>
			<p class="flex text-sm">
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
import UserAchievements from "@/models/userAchievements";
import MaterialIcon from "../app/MaterialIcon.vue";
import { mdiSeal, mdiSquareWave } from "@mdi/js";
import { computed } from "vue";
import { AchievementDifficulty } from "@/models/enums";
import bronzeAchievementImage from "@/assets/game/achievements/Bronze.webp";
import silverAchievementImage from "@/assets/game/achievements/Silver.webp";
import goldAchievementImage from "@/assets/game/achievements/Gold.webp";

const props = defineProps<{ achievement: UserAchievements }>();

const description = computed(() => {
	const desc = props.achievement.achievement.description;
	if (desc == undefined || desc == "") return "Es liegt keine Beschreibung für das Achievement vor.";

	return desc;
});

const computeImage = computed(() => {
	switch (props.achievement.achievement.difficulty) {
		case AchievementDifficulty.Easy:
			return bronzeAchievementImage;
		case AchievementDifficulty.Medium:
			return silverAchievementImage;
		case AchievementDifficulty.Hard:
			return goldAchievementImage;
	}
});

const expReward = computed(() => {
	switch (props.achievement.achievement.difficulty) {
		case AchievementDifficulty.Easy:
			return 5;
		case AchievementDifficulty.Medium:
			return 10;
		case AchievementDifficulty.Hard:
			return 20;
	}
});

const progress = computed(() => {
	if (props.achievement.achievement.neededValue == 0) return 0;
	return Math.floor((props.achievement.currentValue / props.achievement.achievement.neededValue) * 100);
});
</script>
