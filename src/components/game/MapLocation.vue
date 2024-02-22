<script setup lang="ts">
import AttackBanner from "./AttackBanner.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useLocationStore } from "@/stores/locationStore";
import EventManger from "@/models/EventManager";

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
import { GlobalEvents } from "@/models/constants";

const props = defineProps<{
	scale: number;
	posScale: number;
	name: string;
	posX: number;
	posY: number;
	setAttackId: boolean;
}>();

const emits = defineEmits(["clickLocation"]);
const locationStore = useLocationStore();

const isImageLoaded = ref<boolean>(false);
const isLocationAttacked = computed(() => locationStore.isLocationAttacked(props.name));
const isLocationDefended = computed(() => locationStore.isLocationDefended(props.name));

const posx = ref<number>(0);
const posy = ref<number>(0);

watch(isImageLoaded, () => {
	if (isImageLoaded.value) {
		setTimeout(() => {
			EventManger.emit(GlobalEvents.MapLocationLoaded);
		}, 200);
	}
});

let timeoutId = -1;
function updatePositions() {
	window.clearInterval(timeoutId);
	// Update posx
	const left = document.getElementById(props.name)?.getBoundingClientRect().left ?? 1;
	const width = document.getElementById(props.name)?.getBoundingClientRect().width ?? 1;

	posx.value = left + width / 2 - 50;

	// Update posy
	const top = document.getElementById(props.name)?.getBoundingClientRect().top ?? 1;
	const height = document.getElementById(props.name)?.getBoundingClientRect().height ?? 1;

	posy.value = top + height / 2 - 50;

	// timeoutId = window.setTimeout(updatePositions, 5000);
}

const imageSrc = computed(() => {
	switch (props.name) {
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
});

onMounted(() => {
	updatePositions();
	window.addEventListener("resize", updatePositions);
});

onUnmounted(() => {
	window.removeEventListener("resize", updatePositions);
});
</script>

<template>
	<div
		:id="name"
		@click="emits('clickLocation')"
		class="absolute min-w-max origin-top-left h-fit w-fit min-h-max select-none"
		:style="{
			scale: `${scale}`,
			left: `${posX * posScale}px`,
			top: `${posY * posScale}px`,
		}">
		<div class="relative">
			<img
				:id="`${name}-img`"
				:title="name"
				@load="isImageLoaded = true"
				class="object-cover saturate-[25%] group-hover:saturate-100 hover:saturate-100 z-10 cursor-pointer transition-all duration-200 ease-in-out"
				:src="imageSrc"
				:alt="name" />
		</div>
	</div>
	<AttackBanner :banner-for="name" v-if="isImageLoaded && isLocationAttacked" :set-attack-id="setAttackId" />

	<img
		v-if="isImageLoaded && isLocationDefended"
		class="group fixed min-w-max origin-top-left z-20 animate-pulse cursor-pointer"
		src="@/assets/game/locations/Shield.webp"
		@click="emits('clickLocation')"
		@load="updatePositions"
		:style="{
			scale: `${scale * 0.1}`,
			left: `${posx}px`,
			top: `${posy}px`,
		}" />

	<img
		v-if="isImageLoaded && isLocationAttacked && !isLocationDefended"
		class="group fixed min-w-max origin-top-left z-20 animate-pulse cursor-pointer"
		src="@/assets/game/locations/Fire.webp"
		@click="emits('clickLocation')"
		@load="updatePositions"
		:style="{
			scale: `${scale * 0.1}`,
			left: `${posx}px`,
			top: `${posy}px`,
		}" />
</template>

<style scoped></style>
