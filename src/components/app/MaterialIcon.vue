<template>
	<svg title="" viewBox="0 0 24 24" fill="currentColor">
		<path :d="icon"></path>
	</svg>
</template>

<script setup lang="ts">
defineProps<{
	icon: string;
	title?: string;
}>();
</script>
