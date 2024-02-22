import axios from "axios";
import { API_URL } from "@/models/constants";
import LeaderboardEntry from "@/models/leaderboardEntry";

class LeaderboardService {
	private apiClient = axios.create({ baseURL: API_URL });

	public async fetchLeaderboardForLocation(userId: string, locationId: number): Promise<LeaderboardEntry[]> {
		let url = "Leaderboard";
		url += `?userId=${encodeURIComponent(userId)}`;
		url += `&locationId=${encodeURIComponent(locationId)}`;

		const res = await this.apiClient.get(url);
		return res.data.map((entry: LeaderboardEntry) => new LeaderboardEntry(entry));
	}
}

export default new LeaderboardService();
