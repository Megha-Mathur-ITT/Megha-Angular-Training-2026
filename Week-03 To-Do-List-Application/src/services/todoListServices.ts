import type { Task } from "../types/todoListTypes.js"
import { storage } from "../utils/storage.js";
import type { RemoveStatusFilter, RemovePriorityFilter, TaskPriority } from "../types/todoListTypes.js";

export default class TodoServices {
    tasksList: Task[] = [];

    constructor() {
        this.tasksList = storage.getTodoList();
    }

    removeTasksByFilters(statusFilter: RemoveStatusFilter, priorityFilter: RemovePriorityFilter): void {
        this.tasksList = this.tasksList.filter((currentTask) => {
            const statusMatch = statusFilter === "all" ? true : currentTask.status === statusFilter;
            const priorityMatch = priorityFilter === "all" ? true : currentTask.priority === priorityFilter;

            const shouldRemove = statusMatch && priorityMatch;

            return !shouldRemove;
        });

        storage.saveTodoList(this.tasksList);
    }

    toggleTaskStatus(taskId: string): void {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);

        if (!task) {
            throw new Error("Task not found");
        }

        task.status = task.status === "pending" ? "done" : "pending";
        storage.saveTodoList(this.tasksList);
    }

    addTask(title: string, taskPriority: TaskPriority): void {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            throw new Error("Task title cannot be empty");
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
        
        if (!task) {
            throw new Error("Task not found.");
        }

        if (!trimmedTitle) {
            throw new Error("Task title cannot be empty");
        }

        task.title = trimmedTitle;
        storage.saveTodoList(this.tasksList);
    }

    deleteTask(taskId: string): void {
        this.tasksList = this.tasksList.filter((currentTask) => currentTask.taskId !== taskId);
        storage.saveTodoList(this.tasksList);
    }

    toggleTaskPriority(taskId: string): void {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);

        if (!task) {
            throw new Error("Task not found");
        }

        const newPriority = task.priority === "high" ? "low" : "high";
        task.priority = newPriority;
        storage.saveTodoList(this.tasksList);
    }
}
