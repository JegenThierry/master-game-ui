import { TeamId, StudyPhase, ProfileImage } from "./enums";

export class User {
	uid: string = "";
	username: string = "";
	teamId: TeamId = TeamId.Player;
	phase: StudyPhase = StudyPhase.Baseline;
	isDone: boolean = false;
	gameContributionCount: number = 0;
	profileImage: ProfileImage = ProfileImage.None;
	extensionId: string = "";

	constructor(user?: User) {
		if (!user) return;

		this.uid = user.uid;
		this.username = user.username;
		this.teamId = user.teamId;
		this.phase = user.phase;
		this.isDone = user.isDone;
		this.gameContributionCount = user.gameContributionCount;
		this.profileImage = user.profileImage;
		this.extensionId = user.extensionId;
	}
}
