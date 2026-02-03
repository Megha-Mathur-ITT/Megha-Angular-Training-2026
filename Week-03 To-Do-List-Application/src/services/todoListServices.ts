import type { Task } from "../types/todoListTypes.js"
import { storage } from "../utils/storage.js";
import type { RemoveFilter } from "../types/todoListTypes.js";

export default class TodoServices {
    tasksList: Task[] = [];

    constructor() {
        this.tasksList = storage.getTodoList();
    }

    removeTasksByFilter(filter: RemoveFilter): void {
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

    toggleTaskStatus(taskId: string): void {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);

        if (!task) {
            return;
        }

        task.status = task.status === "pending" ? "done" : "pending";
        storage.saveTodoList(this.tasksList);
    }

    addTask(title: string, taskPriority: "high" | "low"): void {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        const newTask: Task = {
            taskId: crypto.randomUUID(),
            title: trimmedTitle,
            createdAt: new Date().toLocaleString(),
            status: "pending",
            priority: taskPriority,
        };

        this.tasksList.push(newTask);
        storage.saveTodoList(this.tasksList);
    }

    editTask(taskId: string, newTaskTitle: string): void {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);
        const trimmedTitle = newTaskTitle.trim();

        if (!task || !trimmedTitle) {
            return;
        }

        task.title = trimmedTitle;
        storage.saveTodoList(this.tasksList);
    }

    deleteTask(taskId: string): void {
        this.tasksList = this.tasksList.filter((currentTask) => currentTask.taskId !== taskId);
        storage.saveTodoList(this.tasksList);
    }

    updatePriority(taskId: string, priority: "high" | "low"): void {
        const task = this.tasksList.find((t) => t.taskId === taskId);

        if (!task) {
            return;
        }

        task.priority = priority;
        storage.saveTodoList(this.tasksList);
    }

    toggleTaskPriority(taskId: string): void {
        const task = storage.getTodoList().find((t) => t.taskId === taskId);

        if (!task) {
            return;
        }

        const newPriority = task.priority === "high" ? "low" : "high";
        this.updatePriority(taskId, newPriority);
    }
}
