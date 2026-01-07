import { getTasks } from "./state";

export function getAllCount(): number {
    return getTasks().length
}

export function getDoneCount(): number {
    let tasks = getTasks().filter((task) => task.completed)
    return tasks.length
}