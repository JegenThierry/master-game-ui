import axios from "axios";
import { API_URL } from "@/models/constants";
import GlitchAttacks from "@/models/glitchAttack";

const apiClient = axios.create({ baseURL: API_URL });

export default {
	async fetchTodaysAttacks(userId: string): Promise<GlitchAttacks[]> {
		try {
			let url = "Attack";
			url += `?userId=${encodeURIComponent(userId)}`;

			const res = await apiClient.get(url);
			return res.data.map((attack: GlitchAttacks) => new GlitchAttacks(attack));
		} catch (error) {
			console.error("Error posting data:", error);
			throw error;
		}
	},
};
