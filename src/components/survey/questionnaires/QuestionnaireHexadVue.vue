<template>
	<div class="flex flex-col gap-y-4">
		<LikertQuestionGroup
			label="Wie sehr stimmen Sie den folgenden Aussagen zu?"
			:questions="questionsHexad"
			:option-labels="optionsHexad"
			:is-seven-point-scale="true"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			"
			:id="'questions-hexad'" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
const emits = defineEmits(["setQuestionValue"]);

let questionsHexad = ref<string[]>([
	"Es macht mich glücklich anderen zu helfen.",
	"Ich mag es, anderen dabei zu helfen, sich in neuen Situationen zurecht zu finden.",
	"Ich teile gerne mein Wissen.",
	"Das Wohlergehen anderer ist mir wichtig.",
	"Die Interaktion mit anderen ist mir wichtig.",
	"Ich bin gerne Teil eines Teams.",
	"Es ist mir wichtig, mich als Teil einer Gemeinschaft zu fühlen.",
	"Gruppenaktivitäten machen mir Spaß.",
	"Es ist mir wichtig, meinen eigenen Weg zu gehen.",
	"Ich lasse mich oft durch Neugier leiten.",
	"Unabhängigkeit ist mir wichtig.",
	"Gelegenheiten zur Selbstentfaltung sind wichtig für mich.",
	"Ich mag es, Hindernisse zu überwinden.",
	"Ich mag es, schwierige Aufgaben zu meistern.",
	"Es ist mir wichtig, meine Fähigkeiten ständig weiter zu entwickeln.",
	"Ich mag es, aus schwierigen Umständen siegreich hervorzugehen.",
	"Ich mag Wettbewerbe, bei denen man Preise gewinnen kann.",
	"Belohnungen sind ein tolles Mittel, um mich zu motivieren.",
	"Das Kosten-Nutzen Verhältnis ist mir wichtig.",
	"Bei angemessener Belohnung strenge ich mich gerne entsprechend an.",
	"Ich provoziere gerne.",
	"Ich stelle den Status Quo gerne in Frage.",
	"Ich würde mich als rebellisch bezeichnen.",
	"Ich halte mich nicht gerne an Regeln.",
]);

const optionsHexad = [
	"Stimme überhaupt nicht zu",
	"Stimme nicht zu",
	"Stimme eher nicht zu",
	"Neutral",
	"Stimme eher zu",
	"Stimme zu",
	"Stimme voll und ganz zu",
];

function shuffleHexad() {
	let currentIndex = questionsHexad.value.length,
		randomIndex;

	// Fisher-Yates (Knuth) Shuffle
	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[questionsHexad.value[currentIndex], questionsHexad.value[randomIndex]] = [
			questionsHexad.value[randomIndex],
			questionsHexad.value[currentIndex],
		];
	}
}

onMounted(() => {
	shuffleHexad();
});
</script>
