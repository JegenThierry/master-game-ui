<script setup lang="ts">
import { StudyPhase } from "@/models/enums";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
	<div class="flex w-full h-screen bg-gray-200">
		<div class="m-auto card w-auto max-w-lg glass bg-sky-100">
			<div class="card-body">
				<h2 class="card-title">Seite konnte nicht gefunden werden.</h2>
				<p v-if="userStore.activeUser.value?.phase === StudyPhase.Game">
					Die gewünschte Seite konnte nicht gefunden werden. Sollte nach einem Klick auf "Zurück zur Hauptseite", nichts
					passieren konnten die Benutzerinformationen nicht geladen werden. Stellen Sie sicher, dass die Erweiterung
					aktiviert ist und laden Sie die Seite neu.
				</p>
				<p v-else>
					Die gewünschte Seite konnte nicht gefunden werden. Das Spiel ist zu diesem Zeitpunkt noch nicht freigeschaltet
					und wird erst kommenden Donnerstag freigeschaltet werden. Bei Fragen können Sie sich gerne an den
					Studienkoordinator Thierry Jegen über folgende E-Mail Adresse melden: jegenthierry@gmail.com
				</p>
				<div class="card-actions justify-end">
					<RouterLink
						v-if="userStore.activeUser.value?.phase === StudyPhase.Game"
						:to="'/'"
						class="btn btn-primary mt-2"
						>Zurück zur Hauptseite!</RouterLink
					>
				</div>
			</div>
		</div>
	</div>
</template>
