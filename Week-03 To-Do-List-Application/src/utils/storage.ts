import type { Task } from "../types/todoListTypes.js";

const STORAGE_KEY = "todDoList";

export const storage = {
    getTodoList(): Task[] {
        const todDoList = localStorage.getItem(STORAGE_KEY);

        if (!todDoList) {
            return [];
        }

        return JSON.parse(todDoList) as Task[];
    },

    saveTodoList(todDoList: Task[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todDoList));
    }
}