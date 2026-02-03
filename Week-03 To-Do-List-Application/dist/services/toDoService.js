import { storage } from "../utils/storage.js";
export class TodoService {
    constructor() {
        this.tasks = [];
        this.tasks = storage.getTodoList();
    }
    getAllTasks() {
        return this.tasks;
    }
    addTask(title) {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            return;
        }
        const newTask = {
            taskId: crypto.randomUUID(),
            title: trimmedTitle,
            createdAt: new Date().toLocaleString(),
            status: "pending"
        };
        this.tasks.push(newTask);
    }
    toggle(id) {
        const task = this.tasks.find((t) => t.taskId === id);
        if (!task)
            return;
        task.status = task.status === "pending" ? "done" : "pending";
        this.saveTodoList();
    }
    edit(id, newTitle) {
        const task = this.tasks.find((t) => t.taskId === id);
        if (!task)
            return;
        const trimmedTitle = newTitle.trim();
        if (!trimmedTitle)
            return;
        task.title = trimmedTitle;
        this.saveTodoList();
    }
    delete(id) {
        this.tasks = this.tasks.filter((t) => t.taskId !== id);
        this.saveTodoList();
    }
    saveTodoList() {
        storage.saveTodoList(this.tasks);
    }
}
//# sourceMappingURL=toDoService.js.map