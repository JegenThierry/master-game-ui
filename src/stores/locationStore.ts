import { defineStore } from "pinia";
import { ref, watch } from "vue";
import Location from "@/models/location";
import locationsService from "@/services/locationsService";
import { useUserStore } from "./userStore";
import GlitchAttack from "@/models/glitchAttack";
import attackService from "@/services/attackService";
import LeaderboardEntry from "@/models/leaderboardEntry";
import leaderboardService from "@/services/leaderboardService";
import { RefSymbol } from "@vue/reactivity";

export const useLocationStore = defineStore("locations", () => {
	const userStore = useUserStore();
	const locations = ref<Location[]>([]);
	const glitchAttacks = ref<GlitchAttack[]>([]);
	const selectedLocation = ref<Location | undefined>();
	const leaderboardForSelectedLocation = ref<LeaderboardEntry[]>([]);

	watch(
		selectedLocation,
		(newValue: Location | undefined) => {
			console.log(newValue);
			if (!newValue) {
				leaderboardForSelectedLocation.value = [];
				return;
			}

			leaderboardService
				.fetchLeaderboardForLocation(userStore.activeUser.value?.uid ?? "", newValue.id)
				.then((res: LeaderboardEntry[]) => {
					leaderboardForSelectedLocation.value = res;
					leaderboardForSelectedLocation.value.sort((a, b) => b.contributions - a.contributions);
				});
		},
		{ deep: true }
	);

	function updateLocations() {
		locationsService
			.fetchAllLocations(userStore.activeUser.value?.uid ?? "")
			.then((res: Location[]) => (locations.value = res))
			.catch((err) => console.error(err));
	}

	function updateAttacks() {
		attackService
			.fetchTodaysAttacks(userStore.activeUser.value?.uid ?? "")
			.then((res: GlitchAttack[]) => (glitchAttacks.value = res))
			.catch((err) => console.error(err));
	}

	function isLocationAttacked(locationName: string): boolean {
		const found = glitchAttacks.value.find((elem: GlitchAttack) => elem.locationName === locationName);
		return found !== undefined;
	}

	function isLocationDefended(locationName: string): boolean {
		const found = glitchAttacks.value.find(
			(elem: GlitchAttack) => elem.locationName === locationName && elem.defenseValue >= elem.attackValue
		);
		return found !== undefined;
	}

	function getAttack(locationName: string): GlitchAttack | undefined {
		return glitchAttacks.value.find((elem: GlitchAttack) => elem.locationName === locationName);
	}

	return {
		locations,
		selectedLocation,
		leaderboardForSelectedLocation: leaderboardForSelectedLocation,
		updateLocations,
		updateAttacks,
		isLocationAttacked,
		getAttack,
		isLocationDefended,
	};
});
