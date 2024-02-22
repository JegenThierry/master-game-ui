import { TaskType } from "./enums";
import { Task } from "./task";

export default class LocationTask {
	public id: number = 0;
	public locationId: number = 0;
	public userId: string = "";
	public task: Task = new Task(0, "", "", TaskType.MarkingTask);
	public isUnlocked: boolean = false;

	constructor(locationTask?: LocationTask) {
		if (!locationTask) return;

		this.id = locationTask.id;
		this.locationId = locationTask.locationId;
		this.userId = locationTask.userId;
		this.task = new Task(
			locationTask.task.id,
			locationTask.task.name,
			locationTask.task.description,
			locationTask.task.taskType
		);
		this.isUnlocked = locationTask.isUnlocked;
	}
}
