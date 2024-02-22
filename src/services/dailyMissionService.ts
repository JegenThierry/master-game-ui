import { API_URL } from "@/models/constants";
import DailyMission from "@/models/dailyMissions";
import axios from "axios";

class DailyMissionService {
	public async fetchDailyMissions(userId: string): Promise<DailyMission[]> {
		let url = `${API_URL}DailyMission`;
		url += `?userId=${encodeURIComponent(userId)}`;

		const res = await axios.get(url);
		return res.data.map((dailyMission: DailyMission) => new DailyMission(dailyMission));
	}
}

export default new DailyMissionService();
