let tasks = [];
export function getTasks() {
    return tasks;
}
export function setTasks(updater) {
    tasks = updater(tasks);
    save();
}
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function load() {
    try {
        const data = localStorage.getItem("tasks");
        if (!data)
            return;
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
            tasks = parsed;
        }
    }
    catch (_a) {
        tasks = [];
    }
}
