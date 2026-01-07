import type { ITask } from "./task";

type TasksUpdater = (prev: ITask[]) => ITask[];

let tasks: ITask[] = []
let searchQuery: string = '';

export function getTasks(): ITask[] {
    return tasks;
}

export function setTasks(updater: TasksUpdater): void {
    tasks = updater(tasks);
    save();
}

export function setSearchQuery(query: string): void {
    searchQuery = query;
}

export function getSearchQuery(): string {
    return searchQuery;
}

function save(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function load(): void {
    try {
        const data = localStorage.getItem("tasks")
        if (!data) return

        const parsed = JSON.parse(data)
        if (Array.isArray(parsed)) {
            tasks = parsed
        }
    } catch {
        tasks = []
    }
}
