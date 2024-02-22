<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<select required :id="id" class="select select-bordered" :modelValue="modelValue" @input="updateValue">
			<option value="" disabled selected>Bitte wählen Sie die zutreffende Antwort aus</option>
			<option v-for="option in options" :value="option" :key="option">
				{{ option }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string;
	label: string;
	options: string[];
	modelValue: string | null;
}>();
const emit = defineEmits(["update:modelValue"]);

function updateValue(e: Event): void {
	emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>
