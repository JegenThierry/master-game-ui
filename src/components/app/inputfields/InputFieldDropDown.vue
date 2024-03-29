<template>
	<div class="w-full">
		<Listbox v-model="selectedOption">
			<div class="mt-1">
				<ListboxButton
					class="relative w-full cursor-default rounded-lg bg-white border border-indigo-400 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
					<span class="block truncate">{{ selectedOption }}</span>
					<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <MaterialIcon :icon="mdiChevronDown" class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</ListboxButton>

				<transition
					leave-active-class="transition duration-100 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0">
					<ListboxOptions
						class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
						<ListboxOption
							v-slot="{ active, selected }"
							v-for="option in options"
							:key="option"
							:value="option"
							as="template"
							@click="emits('selected-option', option)">
							<li
								:class="[
									active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900',
									'relative cursor-default select-none py-2 pl-10 pr-4',
								]">
								<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ option }}</span>
								<span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
									<MaterialIcon :icon="mdiCheck" class="h-5 w-5" aria-hidden="true" />
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</div>
		</Listbox>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import MaterialIcon from "../MaterialIcon.vue";
import { mdiCheck, mdiChevronDown } from "@mdi/js";

const props = defineProps<{options:string[], default?:string}>();
const emits = defineEmits(['selected-option'])
const selectedOption = ref<string>(props.default ? props.default : props.options[0]);
</script>
