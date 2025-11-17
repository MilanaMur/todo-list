import { state } from "./state.js";
import { render } from "./todo-render.js";

let draggedItem = null;
let dragStartIndex = null;

export function initDragAndDrop() {
  const list = document.querySelector("#todo-list");

  if (!list) return;

  list.addEventListener("dragstart", handleDragStart);
  list.addEventListener("dragover", handleDragOver);
  list.addEventListener("drop", handleDrop);
  list.addEventListener("dragend", handleDragEnd);
}

function handleDragStart(e) {
  const item = e.target.closest(".todo__item");
  if (!item) return;

  draggedItem = item;
  dragStartIndex = Array.from(item.parentNode.children).indexOf(item);

  item.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", item.outerHTML);
}

function handleDragOver(e) {
  e.preventDefault();
  if (!draggedItem) return;

  const item = e.target.closest(".todo__item");
  const list = e.currentTarget;

  if (!item || item === draggedItem) return;

  const bounding = item.getBoundingClientRect();
  const offset = e.clientY - bounding.top;

  if (offset < bounding.height / 2) {
    list.insertBefore(draggedItem, item);
  } else {
    list.insertBefore(draggedItem, item.nextSibling);
  }
}

function handleDrop(e) {
  e.preventDefault();
  if (!draggedItem) return;

  const newOrder = Array.from(e.currentTarget.children).map(
    (child) => child.dataset.id
  );
  state.reorderTodos(newOrder);
  render();
}

function handleDragEnd(e) {
  if (draggedItem) {
    draggedItem.classList.remove("dragging");
    draggedItem = null;
    dragStartIndex = null;
  }
}
