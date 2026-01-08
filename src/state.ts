import type { ITask } from "./task";

type TasksUpdater = (prev: ITask[]) => ITask[];
type TaskSubscriber = () => void;

let tasks: ITask[] = []
let searchQuery: string = '';
let subscribers: TaskSubscriber[] = []

export function getTasks(): ITask[] {
    return tasks;
}

export function setTasks(updater: TasksUpdater): void {
    tasks = updater(tasks);
    save();
    notify();
}

export function setSearchQuery(query: string): void {
    searchQuery = query;
    notify()
}

export function getSearchQuery(): string {
    return searchQuery;
}

export function subscribe(fn: TaskSubscriber): void {
    subscribers.push(fn)
}

function notify(): void {
    subscribers.forEach((fn) => { fn() })
}

function save(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks))
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

    notify()
}
