<template>
	<div
		@click="emits('selectLocation')"
		:class="`${
			isSelected ? 'border-indigo-700 bg-green-50' : 'border-transparent'
		} bg-white hover:bg-indigo-50 cursor-pointer border-2 relative z-10 flex p-2`">
		<div :class="`mx-auto w-full group transition-colors duration-150 flex p-2 h-full max-h-24 gap-x-4`">
			<div class="text-left my-auto max-w-sm">
				<h3 class="font-semibold text-base">{{ location.gameName }}</h3>
				<div class="text-sm">{{ location.description }}</div>
				<div :title="location.url" class="text-xs text-neutral-500 truncate">{{ location.url }}</div>
			</div>
		</div>
		<div v-if="isSelected" class="my-auto mr-4">
			<MaterialIcon class="text-green-500 w-6 h-6" :icon="mdiCheckCircleOutline" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Location from "@/models/location";
import { mdiCheckCircleOutline } from "@mdi/js";
import MaterialIcon from "../app/MaterialIcon.vue";

defineProps<{ location: Location; isSelected: boolean }>();
const emits = defineEmits(["selectLocation"]);
</script>
