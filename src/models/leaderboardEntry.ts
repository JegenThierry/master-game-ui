import { ProfileImage } from "./enums";

export default class LeaderboardEntry {
	public username: string = "";
	public locationId: number = 0;
	public contributions: number = 0;
	public profileImageName: ProfileImage = ProfileImage.None;

	constructor(leaderboardEntry?: LeaderboardEntry) {
		if (!leaderboardEntry) return;

		this.username = leaderboardEntry.username;
		this.locationId = leaderboardEntry.locationId;
		this.contributions = leaderboardEntry.contributions;
		this.profileImageName = leaderboardEntry.profileImageName;
	}
}
