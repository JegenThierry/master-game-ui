<template>
	<div>
		<label :for="id" class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<input
			required
			:id="id"
			v-if="!hasTextArea"
			:placeholder="placeholder"
			class="input input-bordered w-full"
			:type="type ?? 'text'"
			:value="modelValue"
			@input="updateValue" />

		<textarea
			required
			:id="id"
			v-if="hasTextArea"
			class="textarea textarea-bordered w-full"
			:placeholder="placeholder"
			:value="modelValue"
			@input="updateValue" />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	id: string;
	label: string;
	placeholder: string;
	hasTextArea: boolean;
	modelValue: any;
	type?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

function updateValue(e: Event): void {
	emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>
