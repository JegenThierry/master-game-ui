<template>
	<div class="flex flex-col gap-y-4">
		<label :for="id" class="label leading-6 font-medium">
			<span class="label-text">{{ label }}</span>
		</label>

		<img
			class="w-auto object-contain mx-auto"
			v-if="imageSrc"
			:src="imageSrc"
			alt="Beschreibendes Bild" />

		<div class="p-4 border rounded-md bg-neutral-100 shadow-sm">
			<div :class="`${isSevenPointScale ? 'grid-cols-10' : 'grid-cols-8'}`" class="grid w-full mb-4">
				<div class="col-span-3" />
				<ul :class="`${isSevenPointScale ? ' grid-cols-7 col-span-7' : ' grid-cols-5 col-span-5'}`" class="grid w-full">
					<li v-for="optionLabel in optionLabels" :key="optionLabel" class="mx-auto text-center text-xs">
						{{ optionLabel }}
					</li>
				</ul>
			</div>
			<ul :id="id" class="flex flex-col gap-y-2">
				<li
					:class="isLastQuestion(index) ? 'pt-2' : 'border-b py-2'"
					v-for="(question, index) in questions"
					:key="question">
					<LikertQuestion
						v-if="!isSevenPointScale"
						@radio-value-set="emits('setLikertValue', { question: question, answer: $event })"
						:name="`${index}_${id}`"
						:label="question" />

					<LikertQuestionSevenPoint
						v-else-if="isSevenPointScale"
						@radio-value-set="emits('setLikertValue', { question: question, answer: $event })"
						:name="`${index}_${id}`"
						:label="question" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import LikertQuestion from "./LikertQuestion.vue";
import LikertQuestionSevenPoint from "./LikertQuestionSevenPoint.vue";

const emits = defineEmits(["setLikertValue"]);

const props = defineProps<{
	id: string;
	label: string;
	optionLabels: string[];
	questions: string[];
	isSevenPointScale?: boolean;
	imageSrc?: string;
}>();

function isLastQuestion(index: number): boolean {
	return index == props.questions.length - 1;
}
</script>
