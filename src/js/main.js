import "../scss/index.scss";

import { initTodoHandlers } from "./todo-handlers.js";
import { initTheme } from "./theme.js";
import { render } from "./todo-render.js";

initTodoHandlers();
initTheme();
render();
