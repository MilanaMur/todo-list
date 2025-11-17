import { STORAGE_KEY } from "./constants.js";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentFilter = localStorage.getItem("filter") || "all";

export const state = {
  getTodos() {
    return todos;
  },

  getCurrentFilter() {
    return currentFilter;
  },

  setTodos(newTodos) {
    todos = newTodos;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },

  setCurrentFilter(filter) {
    currentFilter = filter;
    localStorage.setItem("filter", filter);
  },

  addTodo(text) {
    const newTodo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };
    todos.push(newTodo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },

  toggleTodo(id) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },

  deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },

  clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },

  reorderTodos(newOrder) {
    const todoMap = new Map(todos.map((todo) => [todo.id, todo]));

    const reorderedTodos = newOrder
      .map((id) => todoMap.get(id))
      .filter(Boolean);

    const remainingTodos = todos.filter((todo) => !newOrder.includes(todo.id));

    todos = [...reorderedTodos, ...remainingTodos];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
