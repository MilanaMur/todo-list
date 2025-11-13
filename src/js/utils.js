export function getTaskWord(count) {
  if (count === 1) return "задача";
  if (count > 1 && count < 5) return "задачи";
  return "задач";
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}
