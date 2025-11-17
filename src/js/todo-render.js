import { list, empty, count, filters } from "./constants.js";
import { state } from "./state.js";
import { getTaskWord } from "./utils.js";

export function render() {
  const todos = state.getTodos();
  const currentFilter = state.getCurrentFilter();

  const filtered = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  list.innerHTML = "";
  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo__item";
    li.dataset.id = todo.id;
    li.dataset.completed = todo.completed;
    li.draggable = true;
    li.innerHTML = ` <label class="todo__checkbox"> <input type="checkbox" class="todo__check-input" ${
      todo.completed ? "checked" : ""
    }> </label> <span class="todo__text">${
      todo.text
    }</span> <div class="todo__actions">  <button class="btn btn--danger todo__delete" title="Удалить">🗑</button> </div> `;
    list.appendChild(li);
  });

  empty.hidden = todos.length > 0;

  const activeCount = todos.filter((todo) => !todo.completed).length;
  count.textContent = `${activeCount} ${getTaskWord(activeCount)}`;

  filters.forEach((btn) => {
    btn.setAttribute("aria-selected", btn.dataset.filter === currentFilter);
  });
}
