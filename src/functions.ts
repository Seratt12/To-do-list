import { openEditModal } from "./modal"
import deleteIcon from './images/delete-icon.png'
import type { ITask } from "./task"

export function createDiv(task: ITask): HTMLParagraphElement {
    const { key, title, completed} = task

    const div = document.createElement('div')
    div.className = 'todo-title'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.name = 'is-completed'
    checkbox.id = `is-completed-${key}`
    checkbox.classList.add('chkbox')
    if (completed)
        checkbox.checked = true

    div.appendChild(checkbox)

    const label = document.createElement('label');
    label.textContent = title;
    label.setAttribute('for', `is-completed-${key}`)

    div.appendChild(label)
    return div;
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

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Редактировать'
    editBtn.className = 'change-btn'
    editBtn.addEventListener("click", () => openEditModal(task))
    todoOptions.appendChild(editBtn)

    const delBtn = document.createElement('button')
    delBtn.className = 'del-btn'
    
    const delIcon = document.createElement('img')
    delIcon.className = 'del-btn-icon'
    delIcon.src = deleteIcon

    delBtn.appendChild(delIcon)

    todoOptions.appendChild(delBtn)

    return todoOptions
}

export function isValidTitle(title: string): boolean {
    return title.length > 0 && title.length <= 37
}