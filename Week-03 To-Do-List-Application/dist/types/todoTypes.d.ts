export type TaskStatus = "pending" | "done";
export type Task = {
    taskId: string;
    title: string;
    createdAt: string;
    status: TaskStatus;
};
export declare enum ActionType {
    Add = "ADD",
    Edit = "EDIT",
    Delete = "DELETE",
    Toggle = "TOGGLE"
}
//# sourceMappingURL=todoTypes.d.ts.map