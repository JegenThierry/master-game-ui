<template>
	<div class="flex flex-col gap-y-4">
		<LikertQuestionGroup
			label="Inwiefern stimmen Sie den folgendenden Aussagen zu?"
			:questions="[
				'Die Aufgabe, <b>`Markieren von Textstellen`</b>, war für mich verständlich.',
				'Die Aufgabe, <b>`Bewerten von Textstellen`</b>, war für mich verständlich.',
				'Die Aufgabe, <b>`Neue Transparenzinformationsseiten finden`</b>, war für mich verständlich.',
				'Die Aufgabe, <b>`Erreichbarkeit von Transparenzinformationsseiten prüfen`</b>, war für mich verständlich.',
				'Die Aufgabe, <b>`Markieren von relevanten Textstellen die zu einem Begriff passen`</b>, war für mich verständlich.',
				'Die Aufgabe, <b>`Transparenzinformationsseiten auf relevante Textstellen die zu einem gegebenen Begriff passen überprüfen`</b>, war für mich verständlich.',
			]"
			:option-labels="optionsAgreement"
			:id="'questions-perception-game-likert-2'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie den folgendenden Aussagen zu?"
			:questions="[
				'Die Aufgabe, <b>`Markieren von Textstellen`</b>, war für mich unterhaltsam.',
				'Die Aufgabe, <b>`Bewerten von Textstellen`</b>, war für mich unterhaltsam.',
				'Die Aufgabe, <b>`Neue Transparenzinformationsseiten finden`</b>, war für mich unterhaltsam.',
				'Die Aufgabe, <b>`Erreichbarkeit von Transparenzinformationsseiten prüfen`</b>, war für mich unterhaltsam.',
				'Die Aufgabe, <b>`Markieren von relevanten Textstellen die zu einem Begriff passen`</b>, war für mich unterhaltsam.',
				'Die Aufgabe, <b>`Transparenzinformationsseiten auf relevante Textstellen die zu einem gegebenen Begriff passen überprüfen`</b>, war für mich unterhaltsam.',
			]"
			:option-labels="optionsAgreement"
			:id="'questions-perception-game-likert-3'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie den folgendenden Aussagen zu?"
			:questions="[
				'Das Gesamtkonzept des Spiels war für mich verständlich.',
				'Die Spielmechanik des Städteverteidigens war für mich verständich.',
				'Das Ressourcenmanagement im Spiel war für mich verständlich.',
				'Das Gesamtkonzept des Spiels war für mich unterhaltsam.',
				'Die Spielmechanik des Städteverteidigens war für mich unterhaltsam.',
				'Das Ressourcenmanagement im Spiel war für mich unterhaltsam.',
			]"
			:option-labels="optionsAgreement"
			:id="'questions-perception-element-likert-4'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie der folgendenden Aussage zu? (Das Bild dient als Beispiel.)"
			:questions="[
				'Das Spielelement, Errungenschaften war für mich relevant.',
				'Das Spielelement, Errungenschaften war für mich unterhaltsam.',
				'Das Erzielen von Fortschritten in dem Spielelement Errungenschaften war für mich verständlich.',
				'Das Erzielen von Fortschritten in dem Spielelement Errungenschaften war für mich wichtig.',
			]"
			:image-src="Errungenschaft"
			:option-labels="optionsAgreement"
			:id="'questions-perception-element-likert-6'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie der folgendenden Aussage zu? (Das Bild dient als Beispiel.)"
			:questions="[
				'Das Spielelement, Freischaltbare Objekte war für mich relevant.',
				'Das Spielelement, Freischaltbare Objekte war für mich unterhaltsam.',
				'Das Erzielen von Fortschritten in dem Spielelement Freischaltbare Objekte war für mich verständlich.',
				'Das Erzielen von Fortschritten in dem Spielelement Freischaltbare Objekte war für mich wichtig.',
			]"
			:image-src="Freischaltbares"
			:option-labels="optionsAgreement"
			:id="'questions-perception-element-likert-7'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie der folgendenden Aussage zu? (Das Bild dient als Beispiel.)"
			:questions="[
				'Das Spielelement, Rangliste war für mich relevant.',
				'Das Spielelement, Rangliste war für mich unterhaltsam.',
				'Das Erzielen von Fortschritten in dem Spielelement Rangliste war für mich verständlich.',
				'Das Erzielen von Fortschritten in dem Spielelement Rangliste war für mich wichtig.',
			]"
			:image-src="Rangliste"
			:option-labels="optionsAgreement"
			:id="'questions-perception-element-likert-8'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie der folgendenden Aussage zu? (Das Bild dient als Beispiel.)"
			:questions="[
				'Das Spielelement, Fortschritt war für mich relevant.',
				'Das Spielelement, Fortschritt war für mich unterhaltsam.',
				'Das Erzielen von Fortschritten in dem Spielelement Fortschritt war für mich verständlich.',
				'Das Erzielen von Fortschritten in dem Spielelement Fortschritt war für mich wichtig.',
			]"
			:image-src="Fortschritt"
			:option-labels="optionsAgreement"
			:id="'questions-perception-element-likert-9'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie der folgendenden Aussage zu? (Das Bild dient als Beispiel.)"
			:questions="[
				'Das Spielelement, Punkte war für mich unterhaltsam.',
				'Das Spielelement, Punkte war für mich relevant.',
				'Das Erzielen von Fortschritten in dem Spielelement Punkte war für mich verständlich.',
				'Das Erzielen von Fortschritten in dem Spielelement Punkte war für mich wichtig.',
			]"
			:image-src="Punkte"
			:option-labels="optionsAgreement"
			:id="'questions-perception-element-likert-10'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern stimmen Sie der folgendenden Aussage zu? (Das Bild dient als Beispiel.)"
			:questions="[
				'Das Erledigen täglicher Missionen war für mich unterhaltsam.',
				'Das Erledigen täglicher Missionen war für mich relevant.',
				'Das Erledigen täglicher Missionen war für mich unterhaltsam.',
				'Das Erledigen täglicher Missionen war für mich abwechslungsreich.',
				'Das Erzielen von Fortschritten in den täglichen Missionen war für mich verständlich.',
				'Das Erzielen von Fortschritten in den täglichen Missionen war für mich wichtig.',
			]"
			:image-src="Mission"
			:option-labels="optionsAgreement"
			:id="'questions-perception-element-likert-12'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<FreeTextQuestion
			label="Inwiefern hat das System Ihre Motivation, Aufgaben zu erledigen, beeinflusst? (Der Begriff System bezieht sich die Browsererweiterung und das Spiel.)"
			id="question-perception"
			placeholder="Ihre Antwort."
			:has-text-area="true"
			@update:model-value="
				emits('setQuestionValue', {
					question:
						'Inwiefern hat das System Ihre Motivation, Aufgaben zu erledigen, beeinflusst? (Der Begriff System bezieht sich die Browsererweiterung und das Spiel.)',
					answer: $event,
				})
			"
			v-model="perception" />

		<QuestionDivider />

		<FreeTextQuestion
			label="Haben Sie weitere Anmerkungen zu den Aufgaben?"
			id="question-comments-tasks"
			placeholder="Ihre Antwort."
			:has-text-area="true"
			@update:model-value="
				emits('setQuestionValue', {
					question: 'Haben Sie weitere Anmerkungen zu den Aufgaben?',
					answer: $event,
				})
			"
			v-model="commentsTasks" />

		<QuestionDivider />

		<FreeTextQuestion
			label="Haben Sie weitere Anmerkungen zu dem Spiel?"
			id="question-comments-game"
			placeholder="Ihre Antwort."
			:has-text-area="true"
			@update:model-value="
				emits('setQuestionValue', {
					question: 'Haben Sie weitere Anmerkungen zu dem Spiel?',
					answer: $event,
				})
			"
			v-model="commentsGame" />

		<QuestionDivider />

		<FreeTextQuestion
			label="Haben Sie weitere Anmerkungen zu der Studie?"
			id="question-comments-general"
			placeholder="Ihre Antwort."
			:has-text-area="true"
			@update:model-value="
				emits('setQuestionValue', {
					question: 'Haben Sie weitere Anmerkungen zu der Studie?',
					answer: $event,
				})
			"
			v-model="commentsGeneral" />

		<QuestionDivider />

		<DropDownQuestion
			id="question-honest-opinion"
			:label="'Sollten wir Ihrer ehrlichen Meinung nach Ihre Daten in unseren Analysen in dieser Studie verwenden?'"
			:options="['Ja', 'Nein']"
			v-model="selectedHonestOpinion"
			@update:model-value="
				emits('setQuestionValue', {
					question:
						'Sollten wir Ihrer ehrlichen Meinung nach Ihre Daten in unseren Analysen in dieser Studie verwenden?',
					answer: $event,
				})
			" />
	</div>
</template>

<script setup lang="ts">
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
import FreeTextQuestion from "../FreeTextQuestion.vue";
import QuestionDivider from "../QuestionDivider.vue";

import Errungenschaft from "@/assets/questionnaire_final_game/Errungenschaft.jpg";
import Fortschritt from "@/assets/questionnaire_final_game/Fortschritt.jpg";
import Freischaltbares from "@/assets/questionnaire_final_game/Freischaltbares.jpg";
import Mission from "@/assets/questionnaire_final_game/Mission.jpg";
import Punkte from "@/assets/questionnaire_final_game/Punkte.jpg";
import Rangliste from "@/assets/questionnaire_final_game/Rangliste.jpg";
import { ref } from "vue";
import DropDownQuestion from "../DropDownQuestion.vue";

const emits = defineEmits(["setQuestionValue"]);

const perception = ref<string>("");
const commentsTasks = ref<string>("");
const commentsGame = ref<string>("");
const commentsGeneral = ref<string>("");
const selectedHonestOpinion = ref<string>("");

const optionsAgreement = ["Trifft nicht zu", "Trifft eher nicht zu", "Weder noch", "Trifft eher zu", "Trifft zu"];
</script>
