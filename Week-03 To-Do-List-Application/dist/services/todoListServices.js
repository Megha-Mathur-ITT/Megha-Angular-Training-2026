import { storage } from "../utils/storage.js";
export default class TodoServices {
    constructor() {
        this.tasksList = [];
        this.tasksList = storage.getTodoList();
    }
    removeTasksByFilter(filter) {
        switch (filter) {
            case "all":
                this.tasksList = [];
                break;
            case "pending":
                this.tasksList = this.tasksList.filter((currentTask) => currentTask.status !== "pending");
                break;
            case "done":
                this.tasksList = this.tasksList.filter((currentTask) => currentTask.status !== "done");
                break;
            case "high":
                this.tasksList = this.tasksList.filter((currentTask) => currentTask.priority !== "high");
                break;
            case "low":
                this.tasksList = this.tasksList.filter((currentTask) => currentTask.priority !== "low");
                break;
        }
        storage.saveTodoList(this.tasksList);
    }
    toggleTaskStatus(taskId) {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);
        if (!task) {
            return;
        }
        task.status = task.status === "pending" ? "done" : "pending";
        storage.saveTodoList(this.tasksList);
    }
    addTask(title, taskPriority) {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            return;
        }
        const newTask = {
            taskId: crypto.randomUUID(),
            title: trimmedTitle,
            createdAt: new Date().toLocaleString(),
            status: "pending",
            priority: taskPriority,
        };
        this.tasksList.push(newTask);
        storage.saveTodoList(this.tasksList);
    }
    editTask(taskId, newTaskTitle) {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);
        const trimmedTitle = newTaskTitle.trim();
        if (!task || !trimmedTitle) {
            return;
        }
        task.title = trimmedTitle;
        storage.saveTodoList(this.tasksList);
    }
    deleteTask(taskId) {
        this.tasksList = this.tasksList.filter((currentTask) => currentTask.taskId !== taskId);
        storage.saveTodoList(this.tasksList);
    }
    updatePriority(taskId, priority) {
        const task = this.tasksList.find((t) => t.taskId === taskId);
        if (!task) {
            return;
        }
        task.priority = priority;
        storage.saveTodoList(this.tasksList);
    }
    toggleTaskPriority(taskId) {
        const task = storage.getTodoList().find((t) => t.taskId === taskId);
        if (!task) {
            return;
        }
        const newPriority = task.priority === "high" ? "low" : "high";
        this.updatePriority(taskId, newPriority);
    }
}
//# sourceMappingURL=todoListServices.js.map