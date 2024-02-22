<template>
	<div
		:id="`label-${labelFor}`"
		class="fixed bg-white bg-opacity-75 backdrop-blur-sm filter shadow-md p-2 text-xs rounded-md font-bold uppercase text-indigo-900 border border-indigo-700"
		:style="{
			left: `${positionX}px`,
			top: `${positionY}px`,
		}">
		{{ name }}
	</div>
</template>

<script setup lang="ts">
import EventManager from "@/models/EventManager";
import { GlobalEvents } from "@/models/constants";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{ labelFor: string; name: string }>();
const positionX = ref(0);
const positionY = ref(0);

let timeoutId = -1;
function updatePosition() {
	window.clearInterval(timeoutId);

	const elem = document.getElementById(props.labelFor);
	if (!elem || elem.getBoundingClientRect().width == 0) {
		setTimeout(updatePosition, 200);
		return;
	}

	const label = document.getElementById(`label-${props.labelFor}`);
	if (!label) {
		setTimeout(updatePosition, 200);
		return;
	}

	const labelBox = label.getBoundingClientRect();
	const borderbox = elem.getBoundingClientRect();

	positionX.value = borderbox.x + borderbox.width / 2 - labelBox.width / 2;
	positionY.value = borderbox.y + borderbox.height;

	// timeoutId = window.setTimeout(updatePosition, 5000);
}

onMounted(() => {
	window.addEventListener("resize", updatePosition);
	EventManager.on(GlobalEvents.MapLocationLoaded, updatePosition);
});

onUnmounted(() => {
	window.removeEventListener("resize", updatePosition);
	EventManager.off(GlobalEvents.MapLocationLoaded, updatePosition);
});
</script>

<style scoped>
div::after {
	content: "";
	position: absolute;
	top: -1rem;
	left: 50%;
	transform: translateX(-50%);
	border-width: 8px;
	border-style: solid;
	border-color: transparent transparent rgb(67 56 202) transparent;
}
</style>
