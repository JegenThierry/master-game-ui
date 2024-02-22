<template>
	<div class="flex flex-col gap-y-4">
		<DropDownQuestion
			id="age-dropdown"
			label="Welches Alter haben Sie?"
			:options="optionsAge"
			v-model="selectedAge"
			@update:model-value="
				emits('setQuestionValue', {
					question: 'Welches Alter haben Sie?',
					answer: $event,
				})
			" />

		<QuestionDivider />

		<div class="flex flex-col">
			<DropDownQuestion
				id="gender-dropdown"
				:options="optionsGender"
				label="Welches Geschlecht haben Sie?"
				@update:model-value="
					emits('setQuestionValue', {
						question: 'Welches Geschlecht haben Sie?',
						answer: $event,
					})
				"
				v-model="selectedGender" />
			<FreeTextQuestion
				v-if="selectedGender == 'Möchte mich selbst beschreiben'"
				id="gender-name"
				label=""
				placeholder="Möchte mich selbst beschreiben"
				@update:model-value="
					emits('setQuestionValue', {
						question: 'Welches Geschlecht haben Sie?',
						answer: $event,
					})
				"
				v-model="selfGender"
				:has-text-area="false" />
		</div>

		<QuestionDivider />

		<FreeTextQuestion
			label="Welche Nationalität haben Sie?"
			id="question-nationality"
			placeholder="Nationalität"
			:has-text-area="false"
			@update:model-value="
				emits('setQuestionValue', {
					question: 'Welche Nationalität haben Sie?',
					answer: $event,
				})
			"
			v-model="nationality" />

		<QuestionDivider />
		<LikertQuestionGroup
			label="Inwiefern treffen die folgenden Aussagen auf Sie zu?"
			:questions="questionsGames"
			:option-labels="OptionLabelsAgreement"
			:id="'questions-games'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<QuestionDivider />

		<LikertQuestionGroup
			label="Inwiefern trifft die folgende Aussage auf Sie zu? Der Begriff 'gamifizierte Anwendung' bezieht sich auf Software oder Plattformen, die Spielmechaniken wie Punkte, Belohnungen und Herausforderungen in nicht-spielbezogene Kontexte integrieren, um die Benutzerinteraktion zu verbessern und die Motivation zu steigern. Beispiele hierfür sind Anwendungen wie Google Fit, Duolingo, Samsung Health, usw."
			:questions="['Ich benutze häufig gamifizierte Anwendungen']"
			:option-labels="OptionLabelsAgreement"
			:id="'question-gamification'"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			" />

		<QuestionDivider />

		<FreeTextQuestion
			label="Wie viele Stunden an Video- und Brettspielen spielen Sie im Durchschnitt pro Woche?"
			type="number"
			id="question-hours"
			placeholder="Stunden"
			:has-text-area="false"
			@update:model-value="
				emits('setQuestionValue', {
					question: 'Wie viele Stunden an Video- und Brettspielen spielen Sie im Durchschnitt pro Woche?',
					answer: $event,
				})
			"
			v-model="hours" />
	</div>
</template>

<script setup lang="ts">
import DropDownQuestion from "@/components/survey/DropDownQuestion.vue";
import FreeTextQuestion from "@/components/survey/FreeTextQuestion.vue";
import { ref } from "vue";
import QuestionDivider from "../QuestionDivider.vue";
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
import { OptionLabelsAgreement } from "@/models/constants";

const emits = defineEmits(["setQuestionValue"]);

const optionsAge = ["<18", "18-24", "25-31", "32-38", "39-45", "46-52", "53-60", ">60"];
const optionsGender = ["Frau", "Mann", "Nicht-Binär", "Möchte keine Angaben machen", "Möchte mich selbst beschreiben"];

const questionsGames = [
	"Ich würde mich selbst als sehr versiert in Spielen bezeichnen",
	"Ich habe eine Leidenschaft für Videospiele",
	"Ich spiele häufig Videospiele",
	"Ich habe eine Leidenschaft für Brettspiele",
	"Ich spiele häufig Brettspiele",
];

const selectedAge = ref<string | null>(null);
const selectedGender = ref<string | null>(null);
const selfGender = ref<string>("");
const nationality = ref<string>("");
const hours = ref<number>();
</script>
