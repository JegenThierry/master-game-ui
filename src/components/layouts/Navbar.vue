<template>
	<div
		v-if="!route.path.includes('questionnaire') && !route.path.includes('studyCompleted')"
		class="flex absolute h-20 bg-base-100 rounded-xl shadow-md m-4 p-4 w-auto gap-x-4 z-20 opacity-95 backdrop-blur-md">
		<Profile
			class="my-auto"
			:imageSrc="profileUrl"
			:username="userStore.activeUser.value?.username ?? ''"
			:current-mana="userStore.userResources.value?.currentMana ?? 0"
			:max-mana="userStore.userResources.value?.maxMana ?? 0"
			:current-stamina="userStore.userResources.value?.currentStamina ?? 0"
			:max-stamina="userStore.userResources.value?.maxStamina ?? 0"
			:level="userStore.userResources.value?.level ?? 0" />
		<ul class="my-auto flex gap-x-4">
			<li class="flex">
				<img
					id="pixeldust-img"
					alt="Pixelstaub"
					title="Pixelstaub"
					class="w-10 h-10 mt-0.5"
					src="@/assets/game/resources/PixelDust.webp" />
				<span class="text-lg font-semibold ml-2 my-auto">{{ userStore.userResources.value?.currentPixelDust }}</span>
			</li>
			<li
				@click="openModal('Manatrank')"
				class="flex cursor-pointer rounded-md hover:bg-gray-100 transition-all duration-200">
				<img
					id="manapotion-img"
					alt="Manatrank"
					title="Manatrank"
					class="w-12 h-12 mt-0.5"
					src="@/assets/game/resources/ManaPotion.webp" />
				<span class="text-lg font-semibold pr-4 my-auto">{{ userStore.userResources.value?.manaPotions }}</span>
			</li>
			<li
				@click="openModal('Ausdauertrank')"
				class="flex cursor-pointer rounded-md hover:bg-gray-100 transition-all duration-200">
				<img
					id="staminapotion-img"
					alt="Ausdauertrank"
					title="Ausdauertrank"
					class="w-12 h-12"
					src="@/assets/game/resources/StaminaPotion.webp" />
				<span class="text-lg font-semibold pr-4 my-auto">{{ userStore.userResources.value?.staminaPotions }}</span>
			</li>
			<li class="flex">
				<RouterLink
					id="dashboard-img"
					class="flex cursor-pointer rounded-md hover:bg-gray-100 transition-all duration-200 my-auto gap-x-2"
					to="/dashboard">
					<MaterialIcon class="w-8 h-8 text-indigo-700" :icon="mdiViewDashboard" />
					<span class="text-lg font-semibold pr-4 my-auto">Dashboard</span>
				</RouterLink>
			</li>
		</ul>
	</div>

	<dialog ref="resourceModal" class="modal">
		<div class="modal-box flex flex-col">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			</form>
			<h3 class="font-bold text-lg">{{ resourceToConsume }} trinken?</h3>
			<p class="py-4">
				Wollen Sie einen {{ resourceToConsume }} trinken um 10 {{ getTrankName(resourceToConsume) }} zu regenerieren.
			</p>
			<form class="ml-auto" method="dialog">
				<button @click="consumeResource" class="btn btn-primary">Trinken</button>
			</form>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import Profile from "../app/Profile.vue";
import { computed, onMounted, ref } from "vue";
import { ProfileImage, ResourceTypes } from "@/models/enums";
import MaterialIcon from "../app/MaterialIcon.vue";
import { mdiViewDashboard } from "@mdi/js";
import { useRoute } from "vue-router";

import antImage from "@/assets/profilePictures/Ant.webp";
import slothImage from "@/assets/profilePictures/Sloth.webp";
import owlImage from "@/assets/profilePictures/Owl.webp";
import elephantImage from "@/assets/profilePictures/Elephant.webp";
import dogImage from "@/assets/profilePictures/Dog.webp";
import catImage from "@/assets/profilePictures/Cat.webp";
import noneImage from "@/assets/profilePictures/none.jpg";

const userStore = useUserStore();
const route = useRoute();

const resourceToConsume = ref<string>("");
const resourceModal = ref<HTMLDialogElement>();

function openModal(consumeResource: string) {
	resourceToConsume.value = consumeResource;
	resourceModal.value?.showModal();
}

const profileUrl = computed(() => {
	console.log(userStore.activeUser.value?.profileImage);
	switch (userStore.activeUser.value?.profileImage) {
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

function getTrankName(resourceName: string): string {
	return resourceName.replaceAll("trank", "");
}

function consumeResource() {
	switch (resourceToConsume.value) {
		case "Manatrank":
			userStore.consumeResources(ResourceTypes.ManaPotion, 1);
			break;
		case "Ausdauertrank":
			userStore.consumeResources(ResourceTypes.StaminaPotion, 1);
			break;
		default:
			return;
	}
	resourceModal.value?.close();
}

onMounted(() => {});
</script>
