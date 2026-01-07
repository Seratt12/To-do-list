import { getTasks, getSearchQuery } from "./state";
import type { ITask } from "./task";

export function getVisibleTasks(): ITask[] {
    const query = getSearchQuery().toLowerCase().trim()

    if (query.length === 0) return getTasks()

    return getTasks().filter((task) => 
        task.title.toLowerCase().includes(query)
    )
}