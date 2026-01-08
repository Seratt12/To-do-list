import { isValidTitle } from "./functions"
import type { ITask } from "./task"
import { setTasks } from "./state"

let editingKey: number | null = null;

const modal = document.getElementById("edit-modal") as HTMLDivElement;
const editInput = document.getElementById("edit-input") as HTMLInputElement;
const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;

export function openEditModal(task: ITask) {
    editingKey = task.key;
    editInput.value = task.title;
    modal.classList.remove("hidden");
    editInput.focus();
}

function closeModal() {
    editingKey = null;
    modal.classList.add("hidden");
}

saveBtn.addEventListener("click", () => {
    const newTitle = editInput.value.trim();
    if (!isValidTitle(newTitle)) {
        alert("Название задачи должно быть от 1 до 100 символов");
        return;
    }

    if (editingKey !== null) {
        setTasks((tasks) =>
            tasks.map((t) => (t.key === editingKey ? { ...t, title: newTitle } : t))
        );
    }
    closeModal();
});

cancelBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
