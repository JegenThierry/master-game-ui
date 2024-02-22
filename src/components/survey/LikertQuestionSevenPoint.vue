<template>
	<div class="grid grid-cols-10 w-full">
		<legend class="col-span-3 text-sm">{{ label }}</legend>
		<ul class="grid grid-cols-7 col-span-7 w-full">
			<li class="mx-auto">
				<input @change="emits('radioValueSet', '1')" type="radio" :name="`${name}`" value="1" class="radio radio-secondary" required />
			</li>
			<li class="mx-auto">
				<input @change="emits('radioValueSet', '2')" type="radio" :name="`${name}`" value="2" class="radio radio-secondary" required />
			</li>
			<li class="mx-auto">
				<input @change="emits('radioValueSet', '3')" type="radio" :name="`${name}`" value="3" class="radio radio-secondary" required />
			</li>
			<li class="mx-auto">
				<input @change="emits('radioValueSet', '4')" type="radio" :name="`${name}`" value="4" class="radio radio-secondary" required />
			</li>
			<li  class="mx-auto">
				<input @change="emits('radioValueSet', '5')" type="radio" :name="`${name}`" value="5" class="radio radio-secondary" required />
			</li>
			<li  class="mx-auto">
				<input @change="emits('radioValueSet', '6')" type="radio" :name="`${name}`" value="6" class="radio radio-secondary" required />
			</li>
			<li  class="mx-auto">
				<input @change="emits('radioValueSet', '7')" type="radio" :name="`${name}`" value="7" class="radio radio-secondary" required />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ name:string, label: string }>();

const emits = defineEmits(["radioValueSet"])
</script>
