const STORAGE_KEY = "todDoList";
export const storage = {
    getTodoList() {
        const todDoList = localStorage.getItem(STORAGE_KEY);
        if (!todDoList) {
            return [];
        }
        return JSON.parse(todDoList);
    },
    saveTodoList(todDoList) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todDoList));
    }
};
//# sourceMappingURL=storage.js.map