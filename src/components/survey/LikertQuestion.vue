<template>
	<div class="grid grid-cols-8 w-full">
		<legend class="col-span-3 text-sm" v-html="label" />
		<ul class="grid grid-cols-5 col-span-5 w-full">
			<li class="mx-auto">
				<input
					@change="emits('radioValueSet', '1')"
					type="radio"
					:name="`${name}`"
					value="1"
					class="radio radio-secondary"
					required />
			</li>
			<li class="mx-auto">
				<input
					@change="emits('radioValueSet', '2')"
					type="radio"
					:name="`${name}`"
					value="2"
					class="radio radio-secondary"
					required />
			</li>
			<li class="mx-auto">
				<input
					@change="emits('radioValueSet', '3')"
					type="radio"
					:name="`${name}`"
					value="3"
					class="radio radio-secondary"
					required />
			</li>
			<li class="mx-auto">
				<input
					@change="emits('radioValueSet', '4')"
					type="radio"
					:name="`${name}`"
					value="4"
					class="radio radio-secondary"
					required />
			</li>
			<li class="mx-auto">
				<input
					@change="emits('radioValueSet', '5')"
					type="radio"
					:name="`${name}`"
					value="5"
					class="radio radio-secondary"
					required />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string; label: string; hideLabel?: boolean }>();

const emits = defineEmits(["radioValueSet"]);
</script>
