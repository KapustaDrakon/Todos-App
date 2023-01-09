import React from "react";
import "./todo-list-item.css";

const TodoListItem = (props) => {
  const { label, time } = props;

  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{label}</span>
        <span className="created">{time}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};

export default TodoListItem;
