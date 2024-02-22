import { ChromeMessages, TaskType } from "@/models/enums";
import LocationTask from "@/models/locationTask";
import { User } from "@/models/user";

// import Browser from "webextension-polyfill";

class MesssageService {
	public async setActiveTask(extensionId: string, task: LocationTask | undefined, target?: string): Promise<void> {
		if (navigator.userAgent.includes("Firefox")) {
			const customEvent = new CustomEvent(ChromeMessages.SetActiveTask, {
				detail: {
					taskType: task?.task.taskType,
					startUrl: "",
					target: target,
				},
			});

			window.dispatchEvent(customEvent);
			return;
		}
		await chrome.runtime.sendMessage(extensionId, {
			message: ChromeMessages.SetActiveTask,
			data: task?.task,
		});
	}

	public async setActiveTaskByTaskType(extensionId: string, task: TaskType, url: string, target?:string): Promise<void> {
		if (navigator.userAgent.includes("Firefox")) {
			const customEvent = new CustomEvent(ChromeMessages.SetActiveTask, {
				detail: {
					taskType: task,
					startUrl: url,
					target: target,
				},
			});

			window.dispatchEvent(customEvent);
			return;
		}

		await chrome.runtime.sendMessage(extensionId, {
			message: ChromeMessages.SetActiveTaskByTaskType,
			data: { taskType: task, startUrl: url },
		});
	}

	public async fetchUser(extensionId: string): Promise<User> {
		if (navigator.userAgent.includes("Firefox")) {
			const res = await browser.runtime.sendMessage(extensionId, {
				message: ChromeMessages.GetUser,
			});
			return new User(res.data);
		}

		const res = await chrome.runtime.sendMessage(extensionId, {
			message: ChromeMessages.GetUser,
		});
		return new User(res.data);
	}
}

export default new MesssageService();
