<template>
	<div class="flex flex-col gap-y-4">
		<LikertQuestionGroup
			label="Wie sehr stimmen Sie den folgenden Aussagen zu? (In dieser Studie bezieht sich der Begriff ‘Aufgaben’ auf spezifische Aktivitäten wie z. B. das Markieren von Textstellen.)"
			:questions="questionsImiTask"
			:option-labels="optionsImiTask"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			"
			:id="'questions-imi-task'" />
	</div>
</template>

<script setup lang="ts">
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
const emits = defineEmits(["setQuestionValue"]);

const questionsImiTask = [
	"Die Aufgaben in der Studie haben mir Spaß gemacht.",
	"Ich fand die Aufgaben in der Studie sehr interessant.",
	"Die Aufgaben in der Studie waren unterhaltsam.",
	"Mit meiner Leistung in den Aufgaben der Studie bin ich zufrieden.",
	"Bei den Aufgaben in der Studie stellte ich mich geschickt an.",
	"Ich glaube, ich war bei den Aufgaben in der Studie ziemlich gut.",
	"Ich konnte die Aufgaben in der Studie selbst steuern.",
	"Bei den Aufgaben in der Studie konnte ich wählen, wie ich es mache.",
	"Bei den Aufgaben in der Studie konnte ich so vorgehen, wie ich es wollte.",
	"Bei den Aufgaben in der Studie fühlte ich mich unter Druck.",
	"Bei den Aufgaben in der Studie fühlte ich mich angespannt.",
	"Ich hatte Bedenken, ob ich die Aufgaben in der Studie gut hinbekomme.",
];

const optionsImiTask = ["stimmt gar nicht", "stimmt wenig", "stimmt teils-teils", "stimmt ziemlich", "stimmt völlig"];
</script>
