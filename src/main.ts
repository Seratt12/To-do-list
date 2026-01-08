import { addTask, deleteTask, renderTasks, toggleTask } from "./task"
import { load, setSearchQuery, subscribe } from "./state"

const buttonAdd = document.querySelector("#todo-form button");

if (buttonAdd) {
    buttonAdd.addEventListener("click", (event) => {
        event.preventDefault();

        const strLabel = document.getElementById('todo-input') as HTMLInputElement
        const strNewTask = strLabel?.value.trim()
        addTask(strNewTask)

        strLabel.value = '';
    })
}

document.getElementById("todo-list")?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains("del-btn")) {
        const li = target.closest("li")
        const key = Number(li?.dataset.key)
        deleteTask(key)
    }

    if (target.classList.contains("chkbox")) {
        const li = target.closest("li")
        const key = Number(li?.dataset.key)
        toggleTask(key)
    }
})

const searchInput = document.getElementById("search-input") as HTMLInputElement;

searchInput?.addEventListener("input", () => {
    setSearchQuery(searchInput.value)
});

subscribe(renderTasks)
load()