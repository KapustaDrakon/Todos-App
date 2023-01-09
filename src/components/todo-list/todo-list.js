import React from "react";
import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({todos, onDeleted}) => {
  const elements = todos.map((item) => {
    const {id, ...itemProps} = item;
    return (
      <span key={id} className="">
        <TodoListItem
          {...itemProps}
          onDeleted={ () => onDeleted(id)}
        />
      </span>
    )
  })
  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

export default TodoList;