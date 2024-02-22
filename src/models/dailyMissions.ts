import { ResourceTypes, TaskType } from "./enums";
import Location from "./location";

export default class DailyMission {
	public id: number = 0;
	public name: string = "";
	public description: string = "";
	public designatedTaskType: TaskType = TaskType.MarkingTask;
	public missionDate: Date = new Date();
	public isCompleted: boolean = false;
	public completedDate: Date = new Date();
	public location: Location | undefined = undefined;
	public resourceType: ResourceTypes = ResourceTypes.Mana;
	public rewardAmount: number = 0;

	constructor(dailyMission?: DailyMission) {
		if (!dailyMission) return;

		this.id = dailyMission.id;
		this.name = dailyMission.name;
		this.description = dailyMission.description;
		this.designatedTaskType = dailyMission.designatedTaskType;
		this.missionDate = new Date(dailyMission.missionDate);
		this.isCompleted = dailyMission.isCompleted;
		this.completedDate = new Date(dailyMission.completedDate);
		this.location = new Location(dailyMission.location);
		this.resourceType = dailyMission.resourceType;
		this.rewardAmount = dailyMission.rewardAmount;
	}
}
