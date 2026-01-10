"use strict";

import { createDiv, createOptions, isValidTitle, createEmptyState } from "./functions";
import { getSearchQuery, setTasks } from "./state";
import { getAllCount } from "./stat"
import { getVisibleTasks } from "./selectors";

export interface ITask {
    key: number;
    title: string;
    completed: boolean;
}

export function deleteTask(key: number): void {
    setTasks((prevTasks) => prevTasks.filter((task) => task.key !== key))
}

export function addTask(title: string): void {
    if (!isValidTitle(title))
    {
        alert("Название задачи должно быть от 1 до 37 символов.")
        return
    }

    setTasks((tasks) => 
        [...tasks, {key: Date.now(), title: title, completed: false}]
    )
}

export function renderTasks(): void {
    clearTasksHtml()

    const tasks = getVisibleTasks();
    const query = getSearchQuery()
    if (tasks && tasks.length > 0) {
        tasks.forEach((task) => {
            printTask(task, query)
        })
    }
    else {
        const list = document.getElementById('todo-list');
        if (list) {
            const p = createEmptyState();
            list.appendChild(p);
        }
    }

    const allElement = document.getElementById('total-count')
    allElement!.textContent = getAllCount().toString()
}

export function toggleTask(key: number): void {
    setTasks((tasks) =>
        tasks.map((task) =>
            task.key === key
                ? { ...task, completed: !task.completed }
                : task
        )
    )
}

export function printTask(task: ITask, query: string): void {
    const list = document.getElementById('todo-list')
    const newTask = document.createElement('li')

    newTask.className = 'todo-item'

    let titleHTML = task.title
    query = query.trim()
    if (query) {
        const regex = new RegExp(`(${query})`, "gi")
        titleHTML = task.title.replace(regex, "<mark>$1</mark>")
    }

    const div = createDiv(task)
    div.children[1].innerHTML = titleHTML
    newTask.appendChild(div)

    const todoOptions = createOptions(task)
    newTask.appendChild(todoOptions)

    if (task.completed)
        newTask.classList.add('completed')

    newTask.dataset.key = task.key.toString()
    list?.appendChild(newTask)
}

export function clearTasksHtml(): void {
    const list = document.getElementById('todo-list');
    if (list) list.innerHTML = ""
}

export function clearTasks(): void {
    setTasks(() => [])
}