<template>
	<div class="flex flex-col gap-y-4">
		<LikertQuestionGroup
			:label="label"
			:questions="questionsImiGame"
			:option-labels="optionsImiGame"
			@set-likert-value="
				emits('setQuestionValue', {
					question: $event.question,
					answer: $event.answer,
				})
			"
			:id="'questions-imi-game'" />
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import LikertQuestionGroup from "../LikertQuestionGroup.vue";
import { computed } from "vue";
import { StudyPhase } from "@/models/enums";
const emits = defineEmits(["setQuestionValue"]);
const userStore = useUserStore();

const label = computed(() => {
	if (
		userStore.activeUser.value?.phase == StudyPhase.QuestionnaireAfterBaseline ||
		userStore.activeUser.value?.phase == StudyPhase.Game
	) {
		return "Wie sehr stimmen Sie den folgenden Aussagen zu? In dieser Studie bezieht sich der Begriff ‘System’ auf die Browsererweiterung.";
	}
	return "Wie sehr stimmen Sie den folgenden Aussagen zu? In dieser Studie bezieht sich der Begriff ‘System’ auf die Browsererweiterung und das Spiel.";
});

const questionsImiGame = [
	"Das Benutzen des Systems hat mir Spaß gemacht.",
	"Ich fand das Benutzen des Systems sehr interessant.",
	"Das Benutzen des Systems war unterhaltsam.",
	"Mit meiner Leistung in dem System bin ich zufrieden.",
	"Bei dem Benutzen des Systems stellte ich mich geschickt an.",
	"Ich glaube, ich war bei dem Benutzen des Systems ziemlich gut.",
	"Ich konnte das Benutzen des Systems selbst steuern.",
	"Bei dem Benutzen des Systems konnte ich wählen, wie ich es mache.",
	"Bei dem Benutzen des Systems konnte ich so vorgehen, wie ich es wollte.",
	"Bei dem Benutzen des Systems fühlte ich mich unter Druck.",
	"Bei dem Benutzen des Systems fühlte ich mich angespannt.",
	"Ich hatte Bedenken, ob ich das Benutzen des Systems gut hinbekomme.",
];

const optionsImiGame = ["stimmt gar nicht", "stimmt wenig", "stimmt teils-teils", "stimmt ziemlich", "stimmt völlig"];
</script>
