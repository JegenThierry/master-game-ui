<template>
	<div class="flex flex-col gap-y-4">
		<LikertQuestionGroup
			label="Bitte denken Sie nun an das Spiel, das Sie vorhin gespielt haben. Denken Sie dabei insbesondere daran, wie Sie sich während des Spielens gefühlt haben. Geben Sie für jede der folgenden Aussagen an, inwieweit Sie dieser zustimmen. Ihnen wird auffallen, dass einige Aussagen sich sehr ähneln. Dies ist beabsichtigt. Lassen Sie sich davon bitte nicht irritieren und bewerten Sie jede einzelne Aussage."
			:questions="questionsPanas"
			:option-labels="optionsPanas"
			:is-seven-point-scale="true"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			"
			:id="'questions-pxi'" />
	</div>
</template>

<script setup lang="ts">
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
const emits = defineEmits(["setQuestionValue"]);

const questionsPanas = [
	"Es war einfach zu verstehen, wie Aktionen im Spiel auszuführen sind.",
	"Die Aktionen zur Spielsteuerung waren für mich klar.",
	"Ich fand das Spiel war leicht zu bedienen.",
	"Ich habe das Gesamtziel des Spiels verstanden.",
	"Die Ziele des Spiels waren für mich klar verständlich.",
	"Ich habe meine Aufgaben im Spiel verstanden.",
	"Das Spiel informierte mich über meinen Spielfortschritt.",
	"Ich konnte meine Leistung im Spiel leicht einschätzen.",
	"Das Spiel gab mir klares Feedback über meinen Fortschritt auf dem Weg zu den einzelnen Zielen.",
	"Mir gefiel die Art und Weise, wie das Spiel gestaltet war.",
	"Mir gefiel das Aussehen (Look and Feel) des Spiels.",
	"Ich schätzte die Ästhetik des Spiels.",
	"Das Spiel zu spielen war für mich bedeutsam.",
	"Das Spiel fühlte sich für mich wichtig an.",
	"Das Spiel zu spielen war ein wertvoller Zeitvertreib für mich.",
	"Ich wollte entdecken, wie sich das Spiel entwickelt.",
	"Ich wollte herausfinden, wie das Spiel verläuft.",
	"Ich war gespannt darauf, wie das Spiel weitergeht.",
	"Ich hatte das Gefühl gut in dem Spiel zu sein.",
	"Ich fühlte mich kompetent, während ich das Spiel spielte.",
	"Ich hatte das Gefühl das Spiel gut zu meistern.",
	"Ich hatte das Gefühl, das Spiel auf meine eigene Art spielen zu können.",
	"Ich hatte das Gefühl, die Wahl zu haben, wie ich das Spiel spielen wollte.",
	"Ich hatte das Gefühl, das Spiel so spielen zu können, wie ich es wollte.",
];

const optionsPanas = [
	"Stimme überhaupt nicht zu",
	"Stimme nicht zu",
	"Stimme eher nicht zu",
	"Stimme weder zu noch nicht zu",
	"Stimme eher zu",
	"Stimme zu",
	"Stimme voll und ganz zu",
];
</script>
