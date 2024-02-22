<template>
	<TransitionRoot appear :show="isOpen" as="template">
		<div class="relative z-40" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div
				:class="enablePointerEvents ? 'pointer-events-none' : ''"
				class="fixed inset-0 z-40 bg-black opacity-5"></div>

			<div
				:class="enablePointerEvents ? 'pointer-events-none' : ''"
				class="overflow-hidden fixed inset-0 z-50 pointer-events-none">
				<div :class="enablePointerEvents ? 'pointer-events-none' : ''" class="overflow-hidden absolute inset-0">
					<div class="flex fixed inset-y-0 right-0 pl-10 max-w-full pointer-events-none sm:pl-16">
						<TransitionChild
							as="template"
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enter-from="translate-x-full"
							enter-to="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leave-from="translate-x-0"
							leave-to="translate-x-full">
							<div
								:class="`max-w-xl ${hasNavbarPadding ? 'h-[calc(100%-5rem)] mt-auto' : ''}`"
								class="w-screen pointer-events-auto">
								<form @keydown.enter.prevent="" class="flex flex-col h-full bg-white shadow-xl">
									<div class="flex-1">
										<!-- Header -->
										<div class="px-4 py-6 bg-primary sm:px-6">
											<div class="flex justify-between items-start space-x-3">
												<div class="space-y-1">
													<h2 class="text-base font-semibold leading-6 text-white" id="slide-over-title">
														{{ title }}
													</h2>
													<p class="text-sm text-indigo-300">
														{{ description }}
													</p>
												</div>
												<div class="flex items-center h-7">
													<button
														@click="emits('close-flyout')"
														type="button"
														class="relative text-indigo-200 rounded-md bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
														<span class="absolute -inset-2.5"></span>
														<span class="sr-only">Dialog schließen</span>
														<MaterialIcon class="w-6 h-6" :icon="mdiClose" />
													</button>
												</div>
											</div>
										</div>
										<div v-if="hasSubheader" class="px-4 py-2 bg-indigo-800 sm:px-6">
											<slot name="sub-header"></slot>
										</div>
									</div>

									<!-- Content Area -->
									<div
										class="overflow-hidden overflow-y-auto py-6 space-y-6 h-full sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
										<slot name="content-area"></slot>
									</div>

									<!-- Form Control -->
									<div class="flex-shrink-0 px-4 py-5 bg-white border-t border-gray-200 sm:px-6">
										<div class="flex justify-end space-x-3">
											<button class="btn btn-ghost" @click="emits('close-flyout')" type="button">Abbrechen</button>
											<slot name="additional-controls"></slot>
										</div>
									</div>
								</form>
							</div>
						</TransitionChild>
					</div>
				</div>
			</div>
		</div>
	</TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import MaterialIcon from "./MaterialIcon.vue";
import { mdiClose } from "@mdi/js";

const emits = defineEmits(["close-flyout"]);
defineProps<{
	isOpen: boolean;
	hasSubheader?: boolean;
	title: string;
	description?: string;
	hasNavbarPadding?: boolean;
	enablePointerEvents?: boolean;
}>();

function handleEscape(event: KeyboardEvent) {
	if (event.key === "Escape") {
		emits("close-flyout");
	}
}

onMounted(() => {
	window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleEscape);
});
</script>
