<template>
	<VOnboardingWrapper class="z-[90000]" ref="wrapper" :steps="steps" />
	<ResponseMessageModal
		v-if="messages.length > 0"
		@close-modal="messageStore.messages.value = []"
		:response-messages="messages" />

	<NotificationMessageModal
		v-if="messageStore.notifications.value.length > 0"
		@close-modal="messageStore.notifications.value = []"
		:notifications="messageStore.notifications.value" />

	<header>
		<Navbar
			v-if="
				user !== undefined &&
				route.name !== 'dashboard' &&
				route.name !== '404' &&
				!route.path.includes('questionnaire')
			" />
		<NotificationToast />
	</header>
	<RouterView v-if="user !== undefined || route.name == 'questionnaire' || route.name == 'updateUserInfo'" class="overflow-hidden w-full h-full" />
	<NotFoundView v-else />

	<TextBox
		v-if="dailyMessages?.length != 0 && showDailyMissionBox"
		@close-box="closeBox()"
		:is-tutorial="false"
		:is-daily-message="true"
		:messages="dailyMessages" />
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "./stores/userStore";
import Navbar from "./components/layouts/Navbar.vue";
import NotificationToast from "./components/app/NotificationToast.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useExtensionStore } from "./stores/extensionStore";
import questionnaireService from "./services/questionnaireService";
import ResponseMessageModal from "@/components/modals/RewardsModal.vue";
import { StudyPhase } from "./models/enums";
import NotificationMessageModal from "./components/modals/NotificationMessageModal.vue";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";
import "v-onboarding/dist/style.css";
import { useMessageStore } from "./stores/messagesStore";
import { User } from "./models/user";
import * as signalR from "@microsoft/signalr";
import { useDailyMissionStore } from "./stores/dailyMissionStore";
import { useLocationStore } from "./stores/locationStore";
import TextBox from "./components/TextBox.vue";
import { WEBSOCKET_URL } from "./models/constants";

const userStore = useUserStore();
const extensionStore = useExtensionStore();
const dailyMissionStore = useDailyMissionStore();
const locationStore = useLocationStore();

const route = useRoute();
const router = useRouter();

const messageStore = useMessageStore();
const messages = computed(() => messageStore.messages.value);

const showDailyMissionBox = ref<boolean>(true);

const user = computed(() => userStore.activeUser.value);

const dailyMessages = computed(() => {
	var dailiesShownForToday = localStorage.getItem("lastDailyCompleted");
	var today = new Date();
	if (dailiesShownForToday == `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`) return [];

	switch (today.getDay()) {
		// Sunday
		case 0:
			return [
				"Der Sonntag ist angebrochen, und mit ihm kommt das Ende eurer Widerstandskraft. Mein Sieg ist unausweichlich.",
				"Heute wird die Stadt erkennen, dass Glitch, der Meister des Chaos, der wahre Herrscher ist. Eure Niederlage ist besiegelt.",
			];
		// Monday, Tuesday, Wednesday
		case 1:
		case 2:
		case 3:
			return [];
		// Thursday
		case 4:
			return [
				"Muhaha, ich bin Glitch, der Meister des Chaos, und ich werde diese Stadt beherrschen. Keine Macht der Welt kann mich stoppen.",
				"Du wirst mich niemals bezwingen, denn selbst du, der magische Held, kannst nicht verhindern, dass ich die Stadt in meinen Griff bekomme.",
				"Nur wenn alle Helden vereint sind und gemeinsam magische Schreine mit ihren Markierungen erschaffen, besteht eine winzige Chance gegen mich.",
				"Aber selbst mit diesen Schreinen seid ihr machtlos gegen mich, denn ohne die Magie, die nur Helden durch das Verifizieren von Markierungen entfesseln können, habt ihr keine Hoffnung, mich aufzuhalten.",
				"Meine ergebenen Diener werden ebenfalls Schreine errichten, um euch zu behindern. Muhahaha!",
			];
		// Friday
		case 5:
			return [
				"Auch wenn ihr mich gestern aufhalten konntet, werde ich nicht aufgeben. Meine Macht wächst mit jedem Moment.",
				"Die Schatten der Nacht werden meine Verbündeten sein, und ihr werdet die Dunkelheit fürchten lernen.",
			];
		// Saturday
		case 6:
			return [
				"Der Samstag wird Zeuge meiner ultimativen Macht. Ihr Helden werdet vor mir zittern.",
				"Mit jedem Schrein, den meine Diener errichten, schwindet eure Hoffnung, mich zu besiegen.",
			];
		default:
			return [];
	}
});

function closeBox() {
	var today = new Date();
	localStorage.setItem("lastDailyCompleted", `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`);
	showDailyMissionBox.value = false;
}

watch(
	() => userStore.activeUser.value,
	(newValue: User | undefined) => {
		if (newValue == undefined) return;

		if (newValue.phase == StudyPhase.Completed) {
			showDailyMissionBox.value = false;
			router.push("/studyCompleted");
			return;
		}

		questionnaireService.getQuestionnaire(newValue.uid).then((res) => {
			if (res.id == -1) {
				if (newValue.phase !== StudyPhase.Game) {
					showDailyMissionBox.value = false;
					router.push("/404");
					return;
				}
				router.push("/");
				return;
			}
			showDailyMissionBox.value = false;
			router.push(`/questionnaire/${res.urlExtension}/${userStore.activeUser.value?.uid}`);
		});
	}
);

const steps = [
	{
		attachTo: { element: "#mana" },
		content: {
			title: "Mana",
			description: "Mana, eine Resource in dem Spiel, wird Konsumiert bei dem Bewerten von markierungen.",
		},
	},
	{
		attachTo: { element: "#stamina" },
		content: {
			title: "Ausdauer",
			description: "Ausdauer, eine Resource in dem Spiel, wird bei dem Suchen von Resourcen verbraucht.",
		},
		on: {
			afterStep: function () {
				localStorage.setItem("tutorialFinishedGame", "true");
			},
		},
	},
	{
		attachTo: { element: "#pixeldust-img" },
		content: {
			title: "Pixelstaub",
			description:
				"Pixelstaub, eine Resource in dem Spiel, wird bei dem erstellen von Markierungen verbraucht. Markierungen erstellen kostet 1 Pixelstaub, für alle 3 weiteren Markierungen wird 1 zusätzlicher Pixelstaub verbraucht.",
		},
	},
	{
		attachTo: { element: "#manapotion-img" },
		content: {
			title: "Mana Trank",
			description: "Manatränke regenerieren 10 einheiten an Mana. Das maximale Mana wird dabei ignoriert.",
		},
	},
	{
		attachTo: { element: "#staminapotion-img" },
		content: {
			title: "Ausdauer Trank",
			description: "Ausdauertränke regenerieren 10 einheiten an Ausdayer. Die maximale Ausdauer wird dabei ignoriert.",
		},
	},
	{
		attachTo: { element: "#dashboard-img" },
		content: {
			title: "Dashboard",
			description:
				"Unter diesem Menüpunkt, können Sie Ranglisten, Freischaltbares, Badges und andere Informationen finden. Die einzelnen Elemente werden in dem Dashboard erklärt.",
		},
	},
	{
		attachTo: { element: "#daily-missions" },
		content: {
			title: "Tägliche Missionen",
			description: "Hier werden täglich neue Missionen angezeigt, die zusätzliche Belohnungen anbieten.",
		},
	},
	{
		attachTo: { element: "#Kirche-img" },
		content: {
			title: "Ort",
			description:
				"Medientintermediäre werden durch Orte auf der Karte Symbolisiert, klicke auf einen Ort, um Details einzusehen. Jeder Tag wird der Glitch unterschiedliche Orte angreifen. Um die Orte vor den Angriffen zu schützen, müssen Sie Aufgaben zusammen mit den anderen Spielern erledigen. (Markierungen werden erst als Verteidigungspunkte gewertet, nachdem sie von anderen Spielern überprüft wurden.)",
		},
	},
	{
		attachTo: { element: "#attack" },
		content: {
			title: "Angriffe",
			description:
				"Jeden Tag werden verschiedene Orte von dem bösen Glitch angegriffen. Ziel des Spiels ist es, diese Orte zu verteidigen. Um Orte zu verteidigen, müssen Sie schützende Schreine bauen. Ein Schrein kann gebaut werden, indem erstellte Markierungen durch Bewertungsaufgaben verifiziert werden.",
		},
		on: {
			afterStep: function () {
				localStorage.setItem("tutorialFinishedGame", "true");
			},
		},
	},
];

const wrapper = ref(null);
const { start } = useVOnboarding(wrapper);

const connection = new signalR.HubConnectionBuilder().withUrl(WEBSOCKET_URL).build();

onMounted(async () => {
	await router.isReady();
	if (route.path != "/") {
		showDailyMissionBox.value = false;
	}

	console.log(route.path);
	if (route.path.includes("updateUserInfo")) {
		console.log("asdf");
		return;
	}

	const extensionId = localStorage.getItem("extensionId");
	if (extensionId) extensionStore.extensionId = extensionId;

	const userId = localStorage.getItem("userId");
	if (!userId) return;

	connection.on("UpdatedResources", () => {
		userStore.fetchUserResources();
		dailyMissionStore.updateDailyMissions();
	});

	connection.on("GameUpdate", () => {
		messageStore.updateUserNotifications(userStore.activeUser.value?.uid ?? "");
		locationStore.updateAttacks();
	});

	connection
		.start()
		.then(() => {
			connection.invoke("JoinGroup", userId).then(() => {
				console.log(`Connected as : ${userId}`);
			});

			connection.invoke("JoinWebsiteGroup", "game_url").then(() => {
				console.log(`Connected to Socket group game_url`);
			});
		})
		.catch((err) => console.error(err));

	userStore.fetchActiveUser();

	//check if tutorial is finished
	const tutorialFinished = localStorage.getItem("tutorialFinishedGame");
	if (tutorialFinished === null || tutorialFinished === "false") {
		setTimeout(() => {
			start();
		}, 3000);
	}
});
</script>

<style>
:root {
	--v-onboarding-overlay-z: 9000;
	--v-onboarding-step-z: 9001;
}

html {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
	-webkit-font-smoothing: antialiased !important;
	-moz-osx-font-smoothing: grayscale !important;
}
</style>
