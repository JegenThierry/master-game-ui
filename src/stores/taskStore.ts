import {defineStore} from "pinia";
import {ref} from "vue";
import taskService from "../services/taskService";
import {Task} from "@/models/task";
import LocationTask from "@/models/locationTask";
import {useUserStore} from "./userStore";

export const useTaskStore = defineStore("tasks", () => {
    const tasks = ref<Task[]>([]);
    const currentLocationTasks = ref<LocationTask[]>([]);

    const activeTask = ref<LocationTask | undefined>(undefined);

    const userStore = useUserStore();

    function updateAvailableTasks() {
        taskService
            .fetchAllTasks()
            .then((res: Task[]) => (tasks.value = res))
            .catch((err) => console.error(err));
    }

    function updateTasksForLocation(locationId: number) {
        taskService
            .fetchTasksForLocation(userStore.activeUser.value?.uid ?? '', locationId)
            .then((res: LocationTask[]) => {
                res.sort(function (a: LocationTask, b: LocationTask) {
                    if (a.isUnlocked && !b.isUnlocked) return -1;
                    if (!a.isUnlocked && b.isUnlocked) return 1;

                    return a.task.name.localeCompare(b.task.name);
                });

                currentLocationTasks.value = res;
            })
            .catch((err) => console.error(err));
    }

    return {tasks, currentLocationTasks, activeTask, updateAvailableTasks, updateTasksForLocation};
});