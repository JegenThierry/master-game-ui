<template>
	<div
		class="card card-side transition-all border border-indigo-100 from-indigo-50 to-transparent bg-white bg-gradient-to-br shadow-lg hover:shadow-xl">
		<div class="flex flex-col m-4 gap-y-4 mr-6 my-auto">
			<img
				class="w-32 h-32 min-w-[8rem] min-h-[8rem] object-cover aspect-square rounded-full object-center shadow-md"
				loading="lazy"
				:src="profileUrl"
				alt="Profilbild" />
		</div>
		<div class="grid grid-cols-4 p-4 w-full">
			<div class="max-w-sm col-span-2">
				<h2 class="card-title text-lg truncate">{{ user.username }}</h2>
				<p id="progress-container" class="flex text-sm font-medium -mb-1">
					Level
					<span class="ml-2 text-indigo-600"> {{ resources.level }} </span>
					<span class="ml-auto"> {{ resources.currentXp }} / {{ resources.expUntilNextLevel }} </span>
				</p>
				<progress
					:title="`${resources.currentXp}/${resources.expUntilNextLevel} Erfahrung`"
					class="progress progress-warning w-full h-3"
					:value="resources.currentXp"
					:max="resources.expUntilNextLevel" />
				<label class="flex text-xs font-medium -mb-2 mt-1"
					>Mana <span class="ml-auto">{{ resources.currentMana }}/{{ resources.maxMana }}</span></label
				><progress
					:title="`${resources.currentMana}/${resources.maxMana} Mana`"
					class="progress progress-primary w-full -mt-2"
					:value="resources.currentMana"
					:max="resources.maxMana" />
				<label class="flex text-xs font-medium -mb-2"
					>Ausdauer <span class="ml-auto">{{ resources.currentStamina }}/{{ resources.maxStamina }}</span></label
				>
				<progress
					:title="`${resources.currentStamina}/${resources.maxStamina} Mana`"
					class="progress progress-success w-full -mt-2"
					:value="resources.currentStamina"
					:max="resources.maxStamina" />
			</div>

			<div class="text-sm">
				<div id="contributions-container" class="flex flex-col max-w-fit">
					<h2 class="card-title text-lg truncate">Insgesamte Beiträge</h2>
					<h3 class="ml-auto text-6xl truncate card-title text-indigo-600 font-bold">
						{{ user.gameContributionCount ?? 0 }}
					</h3>
				</div>
			</div>

			<div class="text-sm">
				<div class="flex flex-col max-w-fit">
					<h2 class="card-title text-lg truncate">Verfügbare Resourcen</h2>
					<ul class="my-auto flex gap-x-4 mt-2">
						<li class="flex">
							<img
								alt="Pixelstaub"
								title="Pixelstaub"
								class="w-10 h-10 mt-0.5"
								src="@/assets/game/resources/PixelDust.webp" />
							<span class="text-lg font-semibold ml-2 my-auto">{{ resources.currentPixelDust }}</span>
						</li>
						<li class="flex rounded-md transition-all duration-200">
							<img
								alt="Manatrank"
								title="Manatrank"
								class="w-12 h-12 mt-0.5"
								src="@/assets/game/resources/ManaPotion.webp" />
							<span class="text-lg font-semibold pr-4 my-auto">{{ resources.manaPotions }}</span>
						</li>
						<li class="flex rounded-md transition-all duration-200">
							<img
								alt="Ausdauertrank"
								title="Ausdauertrank"
								class="w-12 h-12"
								src="@/assets/game/resources/StaminaPotion.webp" />
							<span class="text-lg font-semibold pr-4 my-auto">{{ resources.staminaPotions }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ProfileImage } from "@/models/enums";
import { User } from "@/models/user";
import UserResources from "@/models/userResources";
import { computed, onMounted, ref } from "vue";
import "v-onboarding/dist/style.css";

import antImage from "@/assets/profilePictures/Ant.webp";
import slothImage from "@/assets/profilePictures/Sloth.webp";
import owlImage from "@/assets/profilePictures/Owl.webp";
import elephantImage from "@/assets/profilePictures/Elephant.webp";
import dogImage from "@/assets/profilePictures/Dog.webp";
import catImage from "@/assets/profilePictures/Cat.webp";
import noneImage from "@/assets/profilePictures/none.jpg";

const props = defineProps<{ user: User; resources: UserResources }>();

const profileUrl = computed(() => {
	switch (props.user.profileImage) {
		case ProfileImage.Ant:
			return antImage;
		case ProfileImage.Sloth:
			return slothImage;
		case ProfileImage.Owl:
			return owlImage;
		case ProfileImage.Elephant:
			return elephantImage;
		case ProfileImage.Dog:
			return dogImage;
		case ProfileImage.Cat:
			return catImage;
		case ProfileImage.None:
		default:
			return noneImage;
	}
});
</script>
