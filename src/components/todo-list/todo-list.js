import React from "react";
import PropTypes from 'prop-types';
import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({todos, onDeleted, onCompleted, onEditing}) => {
  const elements = todos.map((item) => {
    const {id, ...itemProps} = item;
    return (
      <span key={id} className="">
        <TodoListItem
          {...itemProps}
          onDeleted={ () => onDeleted(id)}
          onCompleted={ () => onCompleted(id)}
          onEditing={ () => onEditing(id)}
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

TodoList.defaultProps = {
  onDeleted: () => {},
  onCompleted: () => {},
  onEditing: () => {},
  todos: []
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
  onEditing: PropTypes.func
}

export default TodoList;