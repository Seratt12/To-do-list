var _a;
import { addTask, deleteTask, renderTasks, toggleTask } from "./src/task.js";
import { load } from "./src/state.js";
load();
const buttonAdd = document.querySelector("#todo-form button");
if (buttonAdd) {
    buttonAdd.addEventListener("click", (event) => {
        event.preventDefault();
        const strLabel = document.getElementById('todo-input');
        const strNewTask = strLabel === null || strLabel === void 0 ? void 0 : strLabel.value.trim();
        addTask(strNewTask);
        strLabel.value = '';
    });
}
(_a = document.getElementById("todo-list")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("del-btn")) {
        const li = target.closest("li");
        const key = Number(li === null || li === void 0 ? void 0 : li.dataset.key);
        deleteTask(key);
    }
    if (target.classList.contains("chkbox")) {
        const li = target.closest("li");
        const key = Number(li === null || li === void 0 ? void 0 : li.dataset.key);
        toggleTask(key);
    }
});
renderTasks();
