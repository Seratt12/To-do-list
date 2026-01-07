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

export function createOptions(isCompleted: boolean): HTMLDivElement {
    const todoOptions = document.createElement('div');
    todoOptions.classList.add('todo-options');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('chkbox');
    if (isCompleted)
        checkbox.checked = true

    todoOptions.appendChild(checkbox);

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = 'Удалить';

    todoOptions.appendChild(delBtn);

    return todoOptions;
}

export function isValidTitle(title: string): boolean {
    return title.length > 0 && title.length <= 100
}