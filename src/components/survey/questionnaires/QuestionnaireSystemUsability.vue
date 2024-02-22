<template>
	<div class="flex flex-col gap-y-4">
		<LikertQuestionGroup
			label="Bitte beantworten Sie die folgenden Fragen."
			:questions="questionsSus"
			:option-labels="optionsSus"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			"
			:id="'questions-sus'" />
	</div>
</template>

<script setup lang="ts">
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
const emits = defineEmits(["setQuestionValue"]);

const questionsSus = [
	"Ich denke, dass ich das System gerne häufig benutzen würde.",
	"Ich fand das System unnötig komplex.",
	"Ich fand das System einfach zu benutzen.",
	"Ich glaube, ich würde die Hilfe einer technisch versierten Person benötigen, um das System benutzen zu können.",
	"Ich fand, die verschiedenen Funktionen in diesem System waren gut integriert.",
	"Ich denke, das System enthielt zu viele Inkonsistenzen.",
	"Ich kann mir vorstellen, dass die meisten Menschen den Umgang mit diesem System sehr schnell lernen.",
	"Ich fand das System sehr umständlich zu nutzen.",
	"Ich fühlte mich bei der Benutzung des Systems sehr sicher.",
	"Ich musste eine Menge lernen, bevor ich anfangen konnte das System zu verwenden.",
];

const optionsSus = ["Stimme überhaupt nicht zu", "", "", "", "Stimme voll zu"];
</script>
