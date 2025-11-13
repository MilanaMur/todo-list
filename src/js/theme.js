import { themeToggleBtn } from "./constants.js";
import { applyTheme } from "./utils.js";

export function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
    themeToggleBtn.setAttribute("aria-pressed", savedTheme === "dark");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(prefersDark ? "dark" : "light");
    themeToggleBtn.setAttribute("aria-pressed", prefersDark);
  }

  themeToggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    applyTheme(newTheme);
    themeToggleBtn.setAttribute("aria-pressed", newTheme === "dark");
  });
}
