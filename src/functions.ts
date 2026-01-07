import { openEditModal } from "./modal"
import type { ITask } from "./task";

export function createParagraph(text: string): HTMLParagraphElement {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

export function createEmptyState(): HTMLParagraphElement {
    const p = document.createElement('p');
    p.textContent = "Список задач пуст";
    p.className = 'empty-list';
    return p;
}

export function createOptions(task: ITask): HTMLDivElement {
    const todoOptions = document.createElement('div')
    todoOptions.classList.add('todo-options')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('chkbox')
    if (task.completed)
        checkbox.checked = true

    todoOptions.appendChild(checkbox)

    const delBtn = document.createElement('button')
    delBtn.className = 'del-btn'
    delBtn.textContent = 'Удалить'

    todoOptions.appendChild(delBtn)

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Редактировать'
    editBtn.className = 'change-btn'
    editBtn.addEventListener("click", () => openEditModal(task))
    todoOptions.appendChild(editBtn)

    return todoOptions
}

export function isValidTitle(title: string): boolean {
    return title.length > 0 && title.length <= 100
}