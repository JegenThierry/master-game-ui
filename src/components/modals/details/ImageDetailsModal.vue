<template>
	<div class="flex flex-col">
		<h1 class="mx-auto font-bold text-indigo-700 text-2xl pb-4">Freigeschaltet: {{ name }}</h1>
		<div v-if="isUnlockable" class="w-full">
			<img
				v-if="unlockableReward == UnlockablesReward.MarkerCommon"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/unlockables/MarkerCommon.webp"
				alt="Marker Common" />
			<img
				v-if="unlockableReward == UnlockablesReward.MarkerGreenPink"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/unlockables/MarkerGreenRed.webp"
				alt="Marker Green Pink" />
			<img
				v-if="unlockableReward == UnlockablesReward.MarkerRainbow"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/unlockables/MarkerRainbow.webp"
				alt="Marker Rainbow" />
			<img
				v-if="unlockableReward == UnlockablesReward.MarkerRare"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/unlockables/MarkerRare.webp"
				alt="Marker Rare" />
			<img
				v-if="unlockableReward == UnlockablesReward.MarkerSuperRare"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/unlockables/MarkerSuperRare.webp"
				alt="Marker Super Rare" />
		</div>
		<div v-else>
			<img
				v-if="difficulty == AchievementDifficulty.Easy"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/achievements/Bronze.webp"
				alt="Bronze" />

			<img
				v-if="difficulty == AchievementDifficulty.Medium"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/achievements/Silver.webp"
				alt="Silver" />

			<img
				v-if="difficulty == AchievementDifficulty.Hard"
				class="w-32 mx-auto object-cover"
				src="@/assets/game/achievements/Gold.webp"
				alt="Gold" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { AchievementDifficulty, UnlockablesReward } from "@/models/enums";

defineProps<{
	isUnlockable: boolean;
	unlockableReward?: UnlockablesReward;
	difficulty?: AchievementDifficulty;
	name: string;
}>();
</script>
