<template>
	<div class="flex flex-col gap-y-4">
		<LikertQuestionGroup
			label="Nun möchten wir gerne von Ihnen wissen, wie Sie sich fühlen. Die folgenden Wörter beschreiben unterschiedliche Gefühle und Empfindungen. Lesen Sie jedes Wort und tragen Sie dann in die Skala neben jedem Wort die Intensität ein. Sie haben die Möglichkeit, zwischen fünf Abstufungen zu wählen. Geben Sie bitte an, wie Sie sich im Allgemeinen fühlen."
			:questions="questionsPanas"
			:option-labels="optionsPanas"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			"
			:id="'questions-panas'" />
	</div>
</template>

<script setup lang="ts">
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
const emits = defineEmits(["setQuestionValue"]);

const questionsPanas = [
	"aktiv",
	"bekümmert",
	"interessiert",
	"freudig erregt",
	"verärgert",
	"stark",
	"schuldig",
	"erschrocken",
	"feindselig",
	"angeregt",
	"stolz",
	"gereizt",
	"begeistert",
	"beschämt",
	"wach",
	"nervös",
	"entschlossen",
	"aufmerksam",
	"durcheinander",
	"ängstlich",
];

const optionsPanas = ["gar nicht", "ein bisschen", "einigermaßen", "erheblich", "äußerst"];
</script>
