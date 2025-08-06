import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./design-tokens.css";
import "./todo_page.css";
import "./add_todo.css";
import "./completed_task.css";
import App from "./App";

// PUBLIC_INTERFACE
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
