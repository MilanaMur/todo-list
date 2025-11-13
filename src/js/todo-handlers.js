import { form, input, list, filters, clearBtn } from "./constants.js";
import { state } from "./state.js";
import { render } from "./todo-render.js";

export function initTodoHandlers() {
  // Добавление задачи
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    state.addTodo(text);
    input.value = "";
    render();
  });

  // Клики по списку задач
  list.addEventListener("click", (e) => {
    const item = e.target.closest(".todo__item");
    if (!item) return;
    const id = item.dataset.id;

    if (e.target.matches(".todo__check-input")) {
      state.toggleTodo(id);
      render();
    }

    if (e.target.matches(".todo__delete")) {
      state.deleteTodo(id);
      render();
    }
  });

  // Фильтры
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.setCurrentFilter(btn.dataset.filter);
      render();
    });
  });

  // Очистка выполненных задач
  clearBtn.addEventListener("click", () => {
    state.clearCompleted();
    render();
  });
}
