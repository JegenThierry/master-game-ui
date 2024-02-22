<template>
	<div class="bg-gradient-to-b to-sky-100 via-sky-200 from-sky-300 h-full">
		<!-- Music by <a href="https://pixabay.com/users/alex-productions-32020823/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=135528">Alex Cristoforetti</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=135528">Pixabay</a> -->
		<audio class="opacity-0" ref="audioPlayer" :src="BgMusic" loop />
		<div class="position fixed top-4 right-4 z-10 cursor-pointer text-indigo-700 opacity-90" @click="toggleMute()">
			<MaterialIcon class="w-10 h-10" :icon="isMute ? mdiVolumeOff : mdiVolumeHigh" />
		</div>
		<GameAnimation :number-of-clouds="20" />
		<DailyMissions />

		<div class="animation select-none flex w-screen h-screen min-w-[1280px] min-h-[720px]">
			<div id="container" class="relative m-auto origin-top-left aspect-video">
				<img
					id="background"
					class="object-contain max-h-[90vh] max-w-[90vw] aspect-video"
					src="@/assets/game/locations/Map.webp"
					alt="GameMap"
					@load="updateBackgroundSize" />

				<!-- Interactive Map objekts -->
				<MapLocation
					v-for="(location, index) in locationStore.locations"
					:key="location.id"
					:name="location.gameName"
					:pos-scale="posScale"
					:pos-x="location.positionX"
					:pos-y="location.positionY"
					:scale="myScale"
					:set-attack-id="index == 0"
					@clickLocation="selectLocation(location)" />

				<MapLocationLabels
					v-for="location in locationStore.locations"
					:key="location.id"
					:label-for="location.gameName"
					:name="location.name" />
			</div>
		</div>
		<FlyOutSidebar
			:is-open="selectedLocation !== undefined"
			:title="selectedLocation?.gameName ?? ''"
			:description="selectedLocation?.description ?? ''"
			:has-subheader="true"
			@close-flyout="locationStore.selectedLocation = undefined">
			<template #sub-header>
				<span class="text-indigo-100 text-sm">
					Dieser Ort repräsentiert <span class="font-bold">{{ selectedLocation?.url }}</span>
				</span>
			</template>
			<template class="flex flex-col h-full" #content-area>
				<div
					v-if="locationStore.isLocationAttacked(selectedLocation?.gameName ?? '')"
					class="p-4 relative z-10 bg-warning flex flex-col gap-y-2 h-fit">
					<div class="flex gap-x-4 mx-auto w-4/5 animate-pulse">
						<MaterialIcon class="w-5 h-5 my-auto min-w-[1.25rem] text-gray-700" :icon="mdiSwordCross" />
						<span>
							{{ selectedLocation?.gameName }} wird angegriffen, mit einem Wert von
							<b title="Es müssen mindestens soviele Textstellen markiert und verifiziert werden.">
								{{ locationStore.getAttack(selectedLocation?.gameName ?? "")?.attackValue }}.
							</b>
							<span class="text-xs">(Um diesen Ort zu verteidigen braucht es verifizierte markierungen.)</span>
						</span>
					</div>
					<div class="flex flex-col mx-auto w-3/4 px-4 gap-y-1">
						<label class="text-sm font-medium">Verteidgungstand</label>
						<progress
							:title="`${locationStore.getAttack(selectedLocation?.gameName ?? '')?.defenseValue ?? 0}/${
								locationStore.getAttack(selectedLocation?.gameName ?? '')?.attackValue
							} Verteidigungen`"
							class="progress progress-primary w-full"
							:value="locationStore.getAttack(selectedLocation?.gameName ?? '')?.defenseValue ?? 0"
							:max="locationStore.getAttack(selectedLocation?.gameName ?? '')?.attackValue"></progress>
					</div>
				</div>
				<div class="flex flex-col p-2 py-8 bg-center bg-blur relative -z-0 bg-slate-400">
					<div
						class="absolute inset-0 bg-center bg-auto z-0 blur-md brightness-75"
						:style="{ backgroundImage: 'url(' + imageSrc(selectedLocation?.gameName ?? '') + ')' }"></div>
					<div class="mx-auto stats shadow z-10">
						<div class="stat">
							<div class="stat-figure text-secondary">
								<MaterialIcon class="inline-block w-16 stroke-current" :icon="mdiHeartCircle" />
							</div>
							<div class="stat-value text-secondary">{{ selectedLocation?.totalContributions ?? 0 }}</div>
							<div class="stat-title">Alle Beiträge</div>
							<div class="stat-desc text-secondary">Für den aktuellen Ort.</div>
						</div>

						<div class="stat">
							<div class="stat-figure text-secondary">
								<div class="">
									<img
										loading="lazy"
										alt="profile"
										class="object-contain w-16 h-16 shadow-sm rounded-full"
										src="@/assets/game/achievements/Gold.webp" />
								</div>
							</div>
							<div class="stat-value">
								{{ topContributor ? topContributor.contributions : "" }}
							</div>
							<div class="stat-title w-32 truncate">
								{{ topContributor ? topContributor.username : "" }}
							</div>
							<div class="stat-desc text-secondary">Held des Ortes</div>
						</div>
					</div>
				</div>
				<div class="relative flex flex-col gap-y-2 bg-white w-full p-4">
					<legend class="text-sm text-gray-700">Ort auswählen oder neue Seiten suchen.</legend>
					<ul class="steps w-full mx-auto">
						<li @click="selectedSubLocation = undefined" class="step step-primary cursor-pointer">Ort auswählen</li>
						<li :class="`${selectedSubLocation == undefined && sublocations.length != 0 ? '' : 'step-primary'} step`">
							Aufgabe Auswählen
						</li>
					</ul>
				</div>

				<ul v-if="selectedSubLocation != undefined && sublocations.length != 0" class="relative">
					<li
						@click="selectedSubLocation = undefined"
						class="flex gap-x-4 p-4 text-indigo-700 cursor-pointer hover:underline">
						<MaterialIcon :icon="mdiArrowLeft" class="w-4 h-4 my-auto" /> Ort Auswählen
					</li>
				</ul>
				<ul v-if="selectedLocation != undefined && selectedSubLocation == undefined" class="relative">
					<li
						:class="index != sublocations.length - 1 ? 'border-b' : ''"
						@click="selectSubLocation(sublocation)"
						v-for="(sublocation, index) in sublocations"
						:key="sublocation.id">
						<SubLocationEntry :location="sublocation" :is-selected="false" />
					</li>
				</ul>
				<div
					v-if="sublocations.length == 0 || selectedSubLocation != undefined"
					v-for="task in taskStore.currentLocationTasks"
					:key="task.id">
					<TaskEntry :task="task" />
				</div>
				<div class="flex mt-auto p-4">
					<button type="button" @click="exploreLocation()" class="mx-auto btn btn-secondary">
						Ich möchte nach einer neuen Seite suchen.
					</button>
				</div>
			</template>
			<template #additional-controls>
				<button class="btn btn-primary" type="button" @click="startTask()">Aufgabe Starten</button>
			</template>
		</FlyOutSidebar>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import MapLocation from "@/components/game/MapLocation.vue";
import FlyOutSidebar from "@/components/app/FlyOutSidebar.vue";
import GameAnimation from "@/components/game/GameAnimation.vue";
import Location from "@/models/location";
import { useLocationStore } from "@/stores/locationStore";
import locationsService from "@/services/locationsService";
import { useUserStore } from "@/stores/userStore";
import { useTaskStore } from "@/stores/taskStore";
import MaterialIcon from "@/components/app/MaterialIcon.vue";
import { mdiArrowLeft, mdiHeartCircle, mdiSwordCross, mdiVolumeHigh, mdiVolumeOff } from "@mdi/js";
import TaskEntry from "@/components/listEntries/TaskEntry.vue";
import messageService from "@/services/messageService";
import { useExtensionStore } from "@/stores/extensionStore";
import SubLocationEntry from "@/components/game/SubLocationEntry.vue";
import { ProfileImage, TaskType } from "@/models/enums";
import MapLocationLabels from "@/components/game/MapLocationLabels.vue";
import DailyMissions from "@/components/game/DailyMissions.vue";
import BgMusic from "@/assets/music/ambient-dreamy-clouds-135528.mp3";

import BlueBuildingImage from "@/assets/game/locations/BlueBuilding.webp";
import CastleImage from "@/assets/game/locations/Castle.webp";
import FarmHouseImage from "@/assets/game/locations/FarmHouse.webp";
import FlagImage from "@/assets/game/locations/Flag.webp";
import FlowerBedImage from "@/assets/game/locations/FlowerBed.webp";
import GardenImage from "@/assets/game/locations/Garden.webp";
import LakeImage from "@/assets/game/locations/Lake.webp";
import PondImage from "@/assets/game/locations/Pond.webp";
import RedHouseImage from "@/assets/game/locations/RedHouse.webp";
import RocksImage from "@/assets/game/locations/Rocks.webp";
import StoreImage from "@/assets/game/locations/Store.webp";
import BankImage from "@/assets/game/locations/Bank.webp";
import ChurchImage from "@/assets/game/locations/Church.webp";

const locationStore = useLocationStore();
const userStore = useUserStore();
const taskStore = useTaskStore();
const extensionStore = useExtensionStore();

const sublocations = ref<Location[]>([]);
const selectedSubLocation = ref<Location | undefined>(undefined);
const audioPlayer = ref();

const background = ref(document.getElementById("background")?.getBoundingClientRect());

const myScale = computed(() => {
	const originalX = 5760;
	const originalY = 3240;
	console.log("update Scale");

	if (background.value) return Math.min(background.value.width / originalX, background.value.height / originalY);

	return 1;
});

const posScale = computed(() => {
	const originalX = 1920;
	const originalY = 1080;

	if (background.value) return Math.min(background.value.width / originalX, background.value.height / originalY);

	return 1;
});

const selectedLocation = computed(() => locationStore.selectedLocation);
const topContributor = computed(() => {
	if (!locationStore.leaderboardForSelectedLocation) return undefined;
	if (locationStore.leaderboardForSelectedLocation.length == 0) return undefined;
	return locationStore.leaderboardForSelectedLocation[0];
});
function updateBackgroundSize() {
	background.value = document.getElementById("background")?.getBoundingClientRect();
}

function selectLocation(location: Location) {
	locationStore.selectedLocation = location;

	locationsService
		.fetchSublocations(userStore.activeUser.value?.uid ?? "", location.id)
		.then((res: Location[]) => (sublocations.value = res))
		.catch((err) => console.error(err));

	taskStore.updateTasksForLocation(location.id);
}

function selectSubLocation(option: Location) {
	selectedSubLocation.value = option;
}

const imageSrc = (locationName:string) => {
	switch (locationName) {
		case "Blaues Gebäude":
			return BlueBuildingImage;
		case "Schloss":
			return CastleImage;
		case "Bauernhaus":
			return FarmHouseImage;
		case "Flagge":
			return FlagImage;
		case "Blumenbeet":
			return FlowerBedImage;
		case "Garten":
			return GardenImage;
		case "See":
			return LakeImage;
		case "Teich":
			return PondImage;
		case "Rotes Haus":
			return RedHouseImage;
		case "Felsen":
			return RocksImage;
		case "Geschäft":
			return StoreImage;
		case "Bank":
			return BankImage;
		case "Kirche":
			return ChurchImage;
		default:
			return "";
	}
};

async function exploreLocation() {
	if (locationStore.selectedLocation == undefined) return;
	console.log(locationStore.selectedLocation.url, TaskType.ExploringTask);

	if (navigator.userAgent.includes("Firefox")) {
		await messageService.setActiveTaskByTaskType(
			extensionStore.extensionId,
			TaskType.ExploringTask,
			locationStore.selectedLocation.url,
			locationStore.selectedLocation.url
		);
		return;
	}
	await messageService.setActiveTaskByTaskType(
		extensionStore.extensionId,
		TaskType.ExploringTask,
		locationStore.selectedLocation.url
	);
	window.open(locationStore.selectedLocation.url, "_blank");
}

async function startTask(): Promise<void> {
	if (navigator.userAgent.includes("Firefox")) {
		await messageService.setActiveTask(
			extensionStore.extensionId,
			taskStore.activeTask,
			taskStore.activeTask?.task.taskType == TaskType.TimingTask
				? locationStore.selectedLocation?.url
				: selectedSubLocation.value?.url
		);

		locationStore.selectedLocation = undefined;
	}
	await messageService.setActiveTask(extensionStore.extensionId, taskStore.activeTask);

	if (taskStore.activeTask?.task.taskType == TaskType.TimingTask)
		window.open(locationStore.selectedLocation?.url, "_blank");

	window.open(selectedSubLocation.value?.url, "_blank");

	locationStore.selectedLocation = undefined;
}

const isMute = ref<boolean>(false);
function toggleMute() {
	isMute.value = !isMute.value;
	if (isMute.value) audioPlayer.value.volume = 0;
	else {
		audioPlayer.value.volume = 0.3;
		audioPlayer.value.play();
	}
}

onMounted(() => {
	locationStore.updateLocations();
	locationStore.updateAttacks();
	locationStore.selectedLocation = undefined;

	taskStore.updateAvailableTasks();
	window.addEventListener("resize", updateBackgroundSize);

	audioPlayer.value.volume = 0.3;
	audioPlayer.value.play();
});

onUnmounted(() => {
	window.removeEventListener("resize", updateBackgroundSize);
});
</script>

<style scoped>
.animation {
	animation: slidy 5s linear 0s infinite alternate-reverse none;
}

@keyframes slidy {
	0% {
		transform: translateY(10px);
	}
	100% {
		transform: translateY(-10px);
	}
}
</style>
