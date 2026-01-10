import { addTask, deleteTask, renderTasks, toggleTask, clearTasks } from "./task"
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
    if (target.classList.contains("del-btn") || target.classList.contains("del-btn-icon")) {
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

document.getElementById("del-btn-all")?.addEventListener("click", () => {
    const confirmed = confirm("Вы уверены, что хотите удалить все задачи?")
    if (!confirmed) {
        return
    }

    clearTasks()
})

subscribe(renderTasks)
load()