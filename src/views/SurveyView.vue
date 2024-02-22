<template>
	<main class="min-h-screen">
		<VueHeader>
			<template #default>{{ header }}</template>
			<template v-if="description !== ''" #description>
				{{ description }}
			</template>
		</VueHeader>

		<form
			ref="myForm"
			class="flex flex-col mx-auto w-full max-w-7xl mt-10 gap-y-4 h-full p-4"
			@submit.prevent="submitAndGoToNextStep()">
			<StepsIndicator :current-step="activeStep" :steps="steps" />

			<div
				v-if="activeQuestionnaireGroup == undefined"
				class="p-4 flex flex-col gap-y-4 bg-neutral-100 rounded-md shadow-md">
				<h1 class="text-primary text-xl font-semibold">Vielen Dank.</h1>
				<p>
					Sie haben alle Fragen für diese Phase beantwortet. Weitere Details zur Fortsetzung der Studie finden Sie in
					der Erweiterung.
				</p>
				<p>Sie können diese Seite nun schließen.</p>
				<button @click="handleClose()" class="ml-auto btn btn-primary">Schließen</button>
			</div>

			<div v-else class="p-4 bg-neutral-100 rounded-md shadow-md">
				<QuestionnaireDemographicsVue
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-if="steps[activeStep] === Questionnaires.Demographics" />

				<QuestionnairePanasVue
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-else-if="steps[activeStep] === Questionnaires.Panas" />

				<QuestionnaireHexadVue
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-else-if="steps[activeStep] === Questionnaires.Hexad" />

				<QuestionnaireImiTaskVue
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-else-if="steps[activeStep] === Questionnaires.Imi_Task" />

				<QuestionnaireImiGameVue
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-else-if="steps[activeStep] === Questionnaires.Imi_Game" />

				<QuestionnaireSystemUsability
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-else-if="steps[activeStep] === Questionnaires.SystemUsability" />

				<QuestionnairePxiVue
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-else-if="steps[activeStep] === Questionnaires.PXI" />

				<QuestionnaireFinalVue
					@set-question-value="addAnswer($event.question, $event.answer)"
					v-else-if="steps[activeStep] === Questionnaires.Final" />
			</div>

			<button
				v-if="activeStep != steps.length - 1 && activeQuestionnaireGroup != undefined"
				type="submit"
				class="flex mt-auto ml-auto btn btn-primary w-36 mb-10">
				<svg
					v-if="isLoading"
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<span> Weiter </span>
			</button>
			<button
				v-else-if="activeQuestionnaireGroup != undefined"
				type="submit"
				class="flex mt-auto ml-auto btn btn-primary w-auto mb-10">
				<svg
					v-if="isLoading"
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<span> Abschließen </span>
			</button>
		</form>
	</main>
</template>

<script setup lang="ts">
import StepsIndicator from "@/components/app/StepsIndicator.vue";
import VueHeader from "@/components/text/VueHeader.vue";

import { computed, onMounted, onUnmounted, ref } from "vue";
import QuestionnaireDemographicsVue from "@/components/survey/questionnaires/QuestionnaireDemographicsVue.vue";
import { Questionnaires } from "@/models/constants";
import QuestionnairePanasVue from "@/components/survey/questionnaires/QuestionnairePanasVue.vue";
import QuestionnaireImiTaskVue from "@/components/survey/questionnaires/QuestionnaireImiTaskVue.vue";
import QuestionnaireImiGameVue from "@/components/survey/questionnaires/QuestionnaireImiGameVue.vue";
import QuestionnairePxiVue from "@/components/survey/questionnaires/QuestionnairePxiVue.vue";
import QuestionnaireFinalVue from "@/components/survey/questionnaires/QuestionnaireFinalVue.vue";
import QuestionnaireSystemUsability from "@/components/survey/questionnaires/QuestionnaireSystemUsability.vue";

import QuestionnaireGroup from "@/models/questionnaire/questionnaireGroup";
import { QuestionnaireAnswerBuilder } from "@/models/questionnaire/questionnaireAnswerBuilder";
import questionnaireService from "@/services/questionnaireService";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { MessageType } from "@/models/enums";
import QuestionnaireHexadVue from "@/components/survey/questionnaires/QuestionnaireHexadVue.vue";
import { useRoute, useRouter } from "vue-router";
import userService from "@/services/userService";

const userStore = useUserStore();
const notificationStore = useNotificationStore();
const route = useRoute();
const router = useRouter();

const activeStep = ref<number>(0);
const activeQuestionnaireGroup = ref<QuestionnaireGroup | undefined>();
const isLoading = ref<boolean>(false);
const myForm = ref<HTMLFormElement>();

let questionnaireBuilder = new QuestionnaireAnswerBuilder();

const header = computed(() => {
	return activeQuestionnaireGroup.value?.questionnaires[activeStep.value].name;
});

const steps = computed(() => {
	const steps: string[] = [];

	activeQuestionnaireGroup.value?.questionnaires.forEach((q) => {
		steps.push(q.name);
	});

	return steps;
});

const description = computed(() => {
	switch (activeQuestionnaireGroup.value?.questionnaires[activeStep.value].name) {
		default:
			return "";
	}
});

function addAnswer(question: string, answer: any) {
	questionnaireBuilder.setAnswerForQuestion(question, answer as string);
}

function submitAndGoToNextStep() {
	isLoading.value = true;
	const res = questionnaireBuilder.build();

	questionnaireService
		.submitAnswers(res.questionnaireGroupId, res.questionnaireId, userStore.activeUser.value?.uid ?? "", res.answers)
		.then((res) => {
			// only returns a non empty string when all questionnaires have been completed
			if (res !== "") {
				localStorage.setItem("codeForReward", res);
				router.push("/studyCompleted");
			}

			if (activeQuestionnaireGroup.value == undefined) return;
			if (activeQuestionnaireGroup.value?.questionnaires.length - 1 == activeStep.value) {
				activeQuestionnaireGroup.value = undefined;
				return;
			}
			activeStep.value += 1;

			localStorage.setItem(activeQuestionnaireGroup.value.name, JSON.stringify(activeStep.value));

			questionnaireBuilder = new QuestionnaireAnswerBuilder();
			questionnaireBuilder
				.setQuestionnaireGroupId(activeQuestionnaireGroup.value.id)
				.setQuestionnaireId(activeQuestionnaireGroup.value.questionnaires[activeStep.value].id);

			window.scrollTo(0, 0);
		})
		.catch(() => {
			notificationStore.addNotification(
				"Daten konnten nicht übermittelt werden. Bitte prüfen Sie ob alle Fragen beantwortet wurden.",
				MessageType.Error
			);
		})
		.finally(() => {
			isLoading.value = false;
		});
}

function handleClose() {
	window.close();
}

onMounted(() => {
	console.log("Mounted");
	const extensionId = localStorage.getItem("extensionId");
	let userIdStorage = localStorage.getItem("userid");

	if (!userIdStorage || userIdStorage != route.params.userid) {
		userIdStorage = route.params.userid as string;
		localStorage.setItem("userId", userIdStorage);
	}

	userService.fetchUser(userIdStorage).then((res) => {
		userStore.activeUser.value = res;

		if (!extensionId || extensionId != res.extensionId) {
			localStorage.setItem("extensionId", res.extensionId);
		}

		questionnaireService.getQuestionnaire(userStore.activeUser.value?.uid ?? "").then((res: QuestionnaireGroup) => {
			activeQuestionnaireGroup.value = res;
			questionnaireBuilder.setQuestionnaireGroupId(res.id).setQuestionnaireId(res.questionnaires[0].id);
			console.log(res);

			const lastStep = localStorage.getItem(res.name);
			if (lastStep == undefined || lastStep == "") return;

			try {
				activeStep.value = parseInt(lastStep);
				questionnaireBuilder = new QuestionnaireAnswerBuilder();
				questionnaireBuilder
					.setQuestionnaireGroupId(activeQuestionnaireGroup.value.id)
					.setQuestionnaireId(activeQuestionnaireGroup.value.questionnaires[activeStep.value].id);
			} catch (error) {
				console.error(error);
			}
		});
	});
});

onUnmounted(() => {});
</script>
