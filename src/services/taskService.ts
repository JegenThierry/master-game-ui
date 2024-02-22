import { Task } from "@/models/task";
import axios from "axios";
import { API_URL, DEFAULT_ACTIVITIES_AMOUNT } from "@/models/constants";
import { Activity } from "@/models/activity";
import LocationTask from "@/models/locationTask";

class TaskService {
	public apiClient = axios.create({ baseURL: API_URL });

	public async fetchAllTasks(): Promise<Task[]> {
		let route = "Task";
		const res = await this.apiClient.get(route);

		return res.data.map((task: any) => new Task(task.id, task.name, task.description, task.taskType));
	}

	public async fetchActivities(userId: string) {
		let route = "Task/activities";
		route += `/${encodeURIComponent(userId)}`;
		route += `/${DEFAULT_ACTIVITIES_AMOUNT}`;

		const res = await this.apiClient(route);
		return res.data.map(
			(activity: Activity) => new Activity(activity.task, activity.username, activity.profileUrl, activity.teamId)
		);
	}

  public async fetchTasksForLocation(userId:string, locationId:number){
    let route = "Task/locationTasks";
    route += `?userId=${encodeURIComponent(userId)}`;
    route += `&locationId=${encodeURIComponent(locationId)}`;

    const res = await this.apiClient(route);
    return res.data.map((task:LocationTask) => new LocationTask(task));
  }
}

export default new TaskService();
