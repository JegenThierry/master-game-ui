<template>
	<VOnboardingWrapper class="z-[90000]" ref="wrapperDashboard" :steps="steps" />

	<div class="bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
		<div class="sticky top-0 h-16 bg-base-100 shadow-md z-20 opacity-95 backdrop-blur-md">
			<div class="px-6 flex w-full max-w-[90rem] mx-auto h-full gap-x-8">
				<RouterLink :class="`${isActive('home') ? 'font-bold' : ''}`" class="my-auto" to="/">
					<MaterialIcon class="w-6 h-6" :icon="mdiArrowLeft" />
				</RouterLink>
				<RouterLink
					:class="`${isActive('freischaltbares') ? 'font-semibold text-indigo-600' : ''}`"
					class="relative font-semibold transition-all duration-200 group hover:text-indigo-600 my-auto"
					to="#freischaltbares">
					Freischaltbares
					<div
						class="absolute bg-indigo-600 rounded-full h-1 group-hover:w-full w-0 transition-all duration-200 ease-in-out mx-auto" />
				</RouterLink>
				<RouterLink
					:class="`${isActive('errungenschaften') ? 'font-semibold text-indigo-600' : ''}`"
					class="relative font-semibold transition-all duration-200 group hover:text-indigo-600 my-auto"
					to="#errungenschaften">
					Errungenschaften
					<div
						class="absolute bg-indigo-600 rounded-full h-1 group-hover:w-full w-0 transition-all duration-200 ease-in-out mx-auto" />
				</RouterLink>
				<RouterLink
					:class="`${isActive('ranglisten') ? 'font-semibold text-indigo-600' : ''}`"
					class="relative font-semibold transition-all duration-200 group hover:text-indigo-600 my-auto"
					to="#ranglisten">
					Ranglisten
					<div
						class="absolute bg-indigo-600 rounded-full h-1 group-hover:w-full w-0 transition-all duration-200 ease-in-out mx-auto" />
				</RouterLink>
			</div>
		</div>
		<div class="p-6 w-full min-h-screen max-w-[90rem] mx-auto">
			<DashboadUser
				v-if="userStore.activeUser.value && userStore.userResources.value"
				:user="userStore.activeUser.value"
				:resources="userStore.userResources.value" />

			<div class="flex gap-4 flex-col mx-auto">
				<div class="mt-6">
					<h1 id="freischaltbares" class="w-fit font-semibold text-indigo-600 text-2xl">
						<div>Freischaltbares</div>
						<div class="w-full h-1 rounded-full bg-indigo-600"></div>
					</h1>
					<ul id="unlockables-container" class="flex flex-wrap gap-4 mt-8 mx-auto">
						<li v-for="unlockable in unlockablesStore.userUnlockables" :key="unlockable.name">
							<UnlockablesCard :unlockable="unlockable" />
						</li>
					</ul>
				</div>

				<div class="mt-6">
					<h1 id="errungenschaften" class="w-fit font-semibold text-indigo-600 text-2xl">
						<div>Errungenschaften</div>
						<div class="w-full h-1 rounded-full bg-indigo-600"></div>
					</h1>
					<ul id="achievement-container" class="flex flex-wrap gap-4 mt-8 mx-auto">
						<li v-for="achievement in achievementsStore.userAchievements" :key="achievement.name">
							<AchievementCard :achievement="achievement" />
						</li>
					</ul>
				</div>

				<div class="w-full">
					<h1 id="Rangliste" class="max-w-fit font-semibold text-indigo-600 text-2xl mb-6 mt-2">
						<div>Ranglisten</div>
						<div class="w-full h-1 rounded-full bg-indigo-600"></div>
					</h1>
					<div id="leaderboard-container" class="w-1/2 mb-6 max-h-96 min-h-[24rem]">
						<InputFieldDropDown
							class="relative"
							@selected-option="selectLocation"
							:options="locationNames"
							default="Wähle einen Ort aus." />
						<ul class="flex flex-col gap-y-2 mt-2 overflow-auto pb-6">
							<li class="text-sm font-medium" v-if="locationStore.selectedLocation === undefined">
								Bitte wählen sie einen Ort aus.
							</li>
							<LeaderboardListEntry
								v-else
								v-for="(entry, index) in leaderboard"
								:key="entry.locationId"
								:username="entry.username"
								:contributions="entry.contributions"
								:profile-image-url="getProfileUrl(entry.profileImageName)"
								:index="index"
								:offset="offset" />
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MaterialIcon from "@/components/app/MaterialIcon.vue";
import InputFieldDropDown from "@/components/app/inputfields/InputFieldDropDown.vue";
import AchievementCard from "@/components/game/AchievementCard.vue";
import DashboadUser from "@/components/game/DashboadUser.vue";
import LeaderboardListEntry from "@/components/game/LeaderboardListEntry.vue";
import UnlockablesCard from "@/components/game/UnlockablesCard.vue";
import { ProfileImage } from "@/models/enums";
import { useLocationStore } from "@/stores/locationStore";
import { useUnlockablesStore } from "@/stores/unlockablesStore";
import { useUserAchievementsStore } from "@/stores/userAchievementsStore";
import { useUserStore } from "@/stores/userStore";
import { mdiArrowLeft } from "@mdi/js";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";
import { computed, onMounted, ref } from "vue";
import "v-onboarding/dist/style.css";

import antImage from "@/assets/profilePictures/Ant.webp";
import slothImage from "@/assets/profilePictures/Sloth.webp";
import owlImage from "@/assets/profilePictures/Owl.webp";
import elephantImage from "@/assets/profilePictures/Elephant.webp";
import dogImage from "@/assets/profilePictures/Dog.webp";
import catImage from "@/assets/profilePictures/Cat.webp";
import noneImage from "@/assets/profilePictures/none.jpg";

const locationStore = useLocationStore();
const userStore = useUserStore();
const achievementsStore = useUserAchievementsStore();
const unlockablesStore = useUnlockablesStore();

const locationNames = computed(() => locationStore.locations.map((location) => location.gameName));

const offset = computed(() => {
	const userPosition = locationStore.leaderboardForSelectedLocation.findIndex(
		(entry) => entry.username === userStore.activeUser.value?.username
	);

	return userPosition - 2;
});

const leaderboard = computed(() => {
	// Get the user position and create an array with 2 users before and after the user and calculate the offset
	const userPosition = locationStore.leaderboardForSelectedLocation.findIndex(
		(entry) => entry.username === userStore.activeUser.value?.username
	);
	const leaderboard = locationStore.leaderboardForSelectedLocation;
	const relativeLeaderboard = [];
	for (let i = userPosition - 2; i < userPosition + 3; i++) {
		if (i < 0) continue;
		if (i >= leaderboard.length) break;
		relativeLeaderboard.push(leaderboard[i]);
	}

	return relativeLeaderboard;
});

function selectLocation(option: string) {
	console.log(option);
	locationStore.selectedLocation = locationStore.locations.find((location) => location.gameName === option);
	document.getElementById(userStore.activeUser.value?.uid ?? "")?.scrollIntoView();
}

function isActive(link: string) {
	return window.location.href.includes(link);
}

function getProfileUrl(profileImage: ProfileImage) {
	switch (profileImage) {
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
}

const steps = [
	{
		attachTo: { element: "#progress-container" },
		content: {
			title: "Level",
			description:
				"Mit jeder erledigten Aufgabe sammeln Sie Erfahrung. Bei einem Level-Up erhalten Sie Belohnungen in Form von Ressourcen und erhöhen gleichzeitig Ihre maximale Mana- und Ausdauerkapazität.",
		},
	},
	{
		attachTo: { element: "#contributions-container" },
		content: {
			title: "Punkte",
			description:
				"Diese Anzeige zählt die Anzahl der von Ihnen geleisteten Beiträge. Jede abgeschlossene Aufgabe oder Interaktion auf einer Medienintermediärsseite erhöht die Anzahl der Beiträge.",
		},
	},
	{
		attachTo: { element: "#unlockables-container" },
		content: {
			title: "Freischaltbares",
			description:
				"Freischaltbare Objekte sind verfügbar, wobei jedes Objekt eine Anzeige für den Fortschritt und eine dazugehörige Beschreibung besitzt, die erklärt, was genau getan werden muss.",
		},
	},
	{
		attachTo: { element: "#achievement-container" },
		content: {
			title: "Errungenschaften",
			description:
				"Jede Errungenschaft verfügt über eine Fortschrittsanzeige für das Freischalten sowie eine begleitende Beschreibung, die erläutert, welche Bedingungen erfüllt werden müssen.",
		},
	},
	{
		attachTo: { element: "#leaderboard-container" },
		content: {
			title: "Rangliste",
			description:
				"Die Rangliste ist in verschiedene Kategorien für Medienintermediäre unterteilt. Jede Rangliste ist unabhängig von den anderen. Der Benutzer, der den ersten Platz auf einer Rangliste erreicht, wird auf der Übersichtskarte hervorgehoben.",
		},
		on: {
			afterStep: function () {
				localStorage.setItem("dashboarOnboardingCompleted", "true");
			},
		},
	},
];

const wrapperDashboard = ref(null);
const { start, goToStep, finish } = useVOnboarding(wrapperDashboard);

onMounted(() => {
	locationStore.updateLocations();
	achievementsStore.updateUserAchievements();
	unlockablesStore.updateUserUnlockables();

	const dashboarOnboardingCompleted = localStorage.getItem("dashboarOnboardingCompleted");
	if (dashboarOnboardingCompleted == "true") return;

	setTimeout(() => {
		start();
	}, 2000);
});
</script>

<style>
#app {
	background-color: #fafafa;
}
</style>
