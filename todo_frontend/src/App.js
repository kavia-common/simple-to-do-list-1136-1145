import React, { useState } from "react";
import "./App.css";
import "./todo_page.css";
import "./add_todo.css";
import "./completed_task.css";
import "./design-tokens.css";

// PUBLIC_INTERFACE
function App() {
  // Page Routing State: 'list', 'add', 'completed'
  const [page, setPage] = useState("list");
  // To-Do Data State: Array of todos {id, title, detail, completed}
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "TODO TITLE",
      detail: "TODO SUB TITLE",
      completed: false,
    },
    {
      id: 2,
      title: "Another ToDo",
      detail: "Details...",
      completed: false,
    },
    {
      id: 3,
      title: "Grocery Shopping",
      detail: "Eggs, bread, milk, soup",
      completed: true,
    },
  ]);
  // New Todo Form
  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");
  // Edit State: null = no, or {id, ...}
  const [editing, setEditing] = useState(null);

  // PUBLIC_INTERFACE
  function handleAddTodo(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: newTitle,
        detail: newDetail,
        completed: false,
      },
    ]);
    setNewTitle("");
    setNewDetail("");
    setPage("list");
  }

  // PUBLIC_INTERFACE
  function handleEditTodo(e) {
    e.preventDefault();
    setTodos(
      todos.map((td) =>
        td.id === editing.id
          ? { ...td, title: newTitle, detail: newDetail }
          : td,
      ),
    );
    setEditing(null);
    setNewTitle("");
    setNewDetail("");
    setPage("list");
  }

  // PUBLIC_INTERFACE
  function startEditing(todo) {
    setEditing(todo);
    setNewTitle(todo.title);
    setNewDetail(todo.detail);
    setPage("add");
  }

  // PUBLIC_INTERFACE
  function removeTodo(id) {
    setTodos(todos.filter((td) => td.id !== id));
  }

  // PUBLIC_INTERFACE
  function toggleComplete(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, completed: !td.completed } : td,
      ),
    );
  }

  // Split view calculation
  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div>
      {page === "list" && (
        <TodoAppPage
          todos={activeTodos}
          onAdd={() => setPage("add")}
          onEdit={startEditing}
          onDelete={removeTodo}
          onComplete={toggleComplete}
          goToCompleted={() => setPage("completed")}
        />
      )}
      {page === "completed" && (
        <CompletedTaskPage
          todos={completedTodos}
          goBack={() => setPage("list")}
        />
      )}
      {page === "add" && (
        <AddTodoPage
          onBack={() => {
            setEditing(null);
            setPage("list");
          }}
          formTitle={editing ? "Edit Task" : "Add Task"}
          adding={!editing}
          titleVal={newTitle}
          detailVal={newDetail}
          setTitle={setNewTitle}
          setDetail={setNewDetail}
          onSubmit={editing ? handleEditTodo : handleAddTodo}
        />
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function TodoAppPage({
  todos,
  onAdd,
  onEdit,
  onDelete,
  onComplete,
  goToCompleted,
}) {
  return (
    <div className="todo-app-page">
      {/* Status Bar */}
      <StatusBar />

      {/* Appbar */}
      <div className="appbar-main">
        <div className="todo-app-bar-bg"></div>
        <div className="todo-app-title typo-8">TODO APP</div>
        {/* Calendar Icon Placeholder */}
        <div className="todo-app-calendar-icon"></div>
      </div>

      {/* NavBar */}
      <div className="bottom-navbar">
        <button className="nav-item nav-all">
          <span className="nav-icon nav-list-icon" />
          <span className="nav-label typo-6">All</span>
        </button>
        <button
          className="nav-item nav-completed"
          onClick={goToCompleted}
          data-testid="nav-completed-btn"
        >
          <span className="nav-icon nav-tick-icon" />
          <span className="nav-label typo-7">Completed</span>
        </button>
      </div>

      {/* Todo List */}
      <main className="todos-section">
        {todos.length === 0 && (
          <div style={{ color: "var(--color-8b8787)", marginTop: 80 }}>
            No todos yet. Click <b>+</b> to add one!
          </div>
        )}
        {todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            <div className="todo-item-bg shadow-0 radius-15"></div>
            <div className="todo-item-text">
              <div className="todo-title typo-9">{todo.title}</div>
              <div className="todo-subtitle typo-10">{todo.detail}</div>
            </div>
            <div className="todo-actions">
              <button
                aria-label="Mark complete"
                className="todo-action check"
                style={{
                  background: "var(--color-34c759)",
                }}
                onClick={() => onComplete(todo.id)}
              ></button>
              <button
                aria-label="Delete"
                className="todo-action trash"
                style={{
                  background: "var(--color-d6d7ef)",
                }}
                onClick={() => onDelete(todo.id)}
              ></button>
              <button
                aria-label="Edit"
                className="todo-action edit"
                style={{
                  background: "var(--color-b3b7ee)",
                }}
                onClick={() => onEdit(todo)}
              ></button>
            </div>
          </div>
        ))}
      </main>
      {/* Add FAB */}
      <button className="add-new-todo-fab" onClick={onAdd} aria-label="Add new todo">
        <span className="fab-bg"></span>
        <span
          className="fab-plus-icon"
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            top: 20,
            left: 21,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <line
              x1="14"
              y1="6"
              x2="14"
              y2="22"
              stroke="#9395d3"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="14"
              x2="22"
              y2="14"
              stroke="#9395d3"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-notch" />
      <span className="status-time">9:41</span>
      <span className="status-icons" />
    </div>
  );
}

// PUBLIC_INTERFACE
function AddTodoPage({
  onBack,
  formTitle,
  adding,
  titleVal,
  detailVal,
  setTitle,
  setDetail,
  onSubmit,
}) {
  return (
    <div className="add-todo-page">
      {/* Status Bar */}
      <StatusBar />
      {/* Appbar */}
      <div className="appbar-main">
        <div className="appbar-bg"></div>
        <button className="turn-back-btn" onClick={onBack} aria-label="Back">
          <svg width="22" height="22" viewBox="0 0 22 22">
            <polyline
              points="14,6 8,11 14,16"
              fill="none"
              stroke="#9395d3"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="add-todo-title typo-8">{formTitle}</div>
      </div>
      {/* Input Fields */}
      <form className="add-todo-fields" onSubmit={onSubmit}>
        <div className="input-field">
          <label className="input-label typo-11" htmlFor="todo-title">
            Title
          </label>
          <input
            id="todo-title"
            className="input-control"
            type="text"
            placeholder="Enter title..."
            required
            value={titleVal}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label className="input-label typo-11" htmlFor="todo-detail">
            Detail
          </label>
          <input
            id="todo-detail"
            className="input-control"
            type="text"
            placeholder="Enter details..."
            value={detailVal}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <button className="add-btn" type="submit">
          <span>{adding ? "ADD" : "UPDATE"}</span>
        </button>
      </form>
    </div>
  );
}

// PUBLIC_INTERFACE
function CompletedTaskPage({ todos, goBack }) {
  return (
    <div className="completed-task-page">
      <StatusBar />
      <div className="appbar-main">
        <div className="appbar-bg"></div>
        <button className="turn-back-btn" onClick={goBack} aria-label="Back">
          <svg width="22" height="22" viewBox="0 0 22 22">
            <polyline
              points="14,6 8,11 14,16"
              fill="none"
              stroke="#9395d3"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="completed-title typo-8">Completed Task</div>
      </div>
      {/* Completed todos */}
      <main className="todos-section">
        {todos.length === 0 && (
          <div style={{ color: "var(--color-8b8787)", marginTop: 80 }}>
            No completed tasks yet!
          </div>
        )}
        {todos.map((todo) => (
          <div className="todo-item-completed" key={todo.id}>
            <div className="todo-item-bg shadow-0 radius-15"></div>
            <div className="todo-item-text">
              <div className="todo-title typo-9">{todo.title}</div>
              <div className="todo-subtitle typo-10">{todo.detail}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

