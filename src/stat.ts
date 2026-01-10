import { getTasks } from "./state";

export function getAllCount(): number {
    return getTasks().length
}