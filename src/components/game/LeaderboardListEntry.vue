<template>
	<li
		:id="username"
		class="flex p-2 rounded-md shadow-md"
		:class="isUserActiveUser ? 'bg-indigo-50' : 'bg-white'"
		>
		<span class="mr-2 font-medium">{{ Math.max(index + 1 + offset, 1) }}.</span>
		<span>
			<img
				class="my-auto w-6 h-6 ml-2 mr-4 object-cover aspect-square rounded-full object-center shadow-md"
				loading="lazy"
				:src="profileImageUrl"
				:alt="`Profile ${username}`" 
            />
		</span>
		<span class="truncate mr-4 text-sm my-auto">{{ username }}</span>
		<span class="ml-auto font-bold text-indigo-600">{{ contributions }}</span>
	</li>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";

const props = defineProps<{
	username: string;
	contributions: number;
	profileImageUrl: string;
	index: number;
	offset: number;
}>();

const userStore = useUserStore();
const isUserActiveUser = computed(() => props.username === userStore.activeUser.value?.username);
</script>
