"use strict";
import { createParagraph, createOptions, isValidTitle, createEmptyState } from "./functions.js";
import { getTasks, setTasks } from "./state.js";
export function deleteTask(key) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.key !== key));
    renderTasks();
}
export function addTask(title) {
    if (!isValidTitle(title)) {
        alert("Название задачи должно быть от 1 до 100 символов.");
        return;
    }
    setTasks((tasks) => {
        tasks.push({ key: Date.now(), title: title, completed: false });
        return tasks;
    });
    renderTasks();
}
export function renderTasks() {
    clearTasks();
    const tasks = getTasks();
    if (tasks && tasks.length > 0) {
        tasks.forEach((task) => {
            printTask(task);
        });
    }
    else {
        const list = document.getElementById('todo-list');
        if (list) {
            const p = createEmptyState();
            list.appendChild(p);
        }
    }
}
export function toggleTask(key) {
    setTasks((tasks) => {
        const task = tasks.find((task) => task.key === key);
        if (task) {
            task.completed = !task.completed;
        }
        return tasks;
    });
    renderTasks();
}
export function printTask(task) {
    const list = document.getElementById('todo-list');
    const newTask = document.createElement('li');
    newTask.className = 'todo-item';
    const p = createParagraph(task.title);
    newTask.appendChild(p);
    const todoOptions = createOptions(task.completed);
    newTask.appendChild(todoOptions);
    if (task.completed)
        newTask.classList.add('completed');
    newTask.dataset.key = task.key.toString();
    list === null || list === void 0 ? void 0 : list.appendChild(newTask);
}
export function clearTasks() {
    const list = document.getElementById('todo-list');
    if (list)
        list.innerHTML = "";
}
