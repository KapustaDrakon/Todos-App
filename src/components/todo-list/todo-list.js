import React from "react";
import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = () => {
  return (
    <ul className="todo-list">
      <li className="completed">
        <TodoListItem label="Complete task" time="created 17 seconds ago" />
      </li>

      <li className="editing">
        <TodoListItem label="Editing task" time="created 5 minutes ago" />
        <input type="text" className="edit" defaultValue={"Editing task"} />
      </li>

      <li>
        <TodoListItem label="Active task" time="created 5 minutes ago" />
      </li>
    </ul>
  );
};

export default TodoList;
