<template>
	<div
		:id="setAttackId ? 'attack' : ''"
		class="fixed z-30 origin-center"
		:style="{ left: `${position.x}px`, top: `${position.y}px` }">
		<div class="relative drop-shadow-xl">
			<div class="p-2 bg-white rounded-md w-fit">
				<MaterialIcon class="w-6 h-6" :icon="mdiSwordCross" />
			</div>
			<div class="absolute bg-white rotate-45 left-1/3 w-1/3 h-1/3 -bottom-1.5 -z-10" />
		</div>
	</div>
	<!-- <MaterialIcon class="fixed text-orange-500 w-12 h-12" :style="{ left: `${position.x-32}px`, top: `${position.y+116}px` }" :icon="mdiFire"/>
	<MaterialIcon class="fixed text-orange-500 w-12 h-12" :style="{ left: `${position.x+64}px`, top: `${position.y+132}px` }" :icon="mdiFire"/>
	<MaterialIcon class="fixed text-orange-500 w-12 h-12" :style="{ left: `${position.x-64}px`, top: `${position.y+64}px` }" :icon="mdiFire"/> -->
</template>

<script setup lang="ts">
import { mdiFire, mdiSwordCross } from "@mdi/js";
import MaterialIcon from "../app/MaterialIcon.vue";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{ bannerFor: string; setAttackId: boolean }>();

const position = ref<{ x: number; y: number }>({ x: 0, y: 0 });

let timeoutId = -1;
function updatePosition() {
	window.clearInterval(timeoutId);

	const elem = document.getElementById(props.bannerFor);

	if (!elem) return;

	const rect = elem.getBoundingClientRect();

	position.value.x = rect.left + rect.width / 2 - 16;
	position.value.y = rect.top - 32;

	// timeoutId = window.setTimeout(updatePosition, 5000);
}

onMounted(() => {
	window.addEventListener("resize", updatePosition);
	window.addEventListener("scroll", updatePosition);
	updatePosition();
});

onUnmounted(() => {
	window.removeEventListener("resize", updatePosition);
	window.removeEventListener("scroll", updatePosition);
});
</script>
