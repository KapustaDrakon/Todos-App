import React from 'react';
import PropTypes from 'prop-types';

import { TodoListItem } from '../TodoListItem';
import './TodoList.css';

const TodoList = ({ todos, onDeleted, onCompleted, onEditing, editInput, inputFocus, getPadTime, timer, pause }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <span key={id} className="">
        <TodoListItem
          item={item}
          id={id}
          itemProps={itemProps}
          onDeleted={() => onDeleted(id)}
          onCompleted={() => onCompleted(id)}
          onEditing={() => onEditing(id)}
          editInput={editInput}
          inputFocus={inputFocus}
          getPadTime={getPadTime}
          timer={timer}
          pause={pause}
        />
      </span>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TodoList.defaultProps = {
  onDeleted: () => {},
  onCompleted: () => {},
  onEditing: () => {},
  editInput: () => {},
  inputFocus: () => {},
  getPadTime: () => {},
  timer: () => {},
  pause: () => {},
  todos: [],
};

TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
  onEditing: PropTypes.func,
  editInput: PropTypes.func,
  inputFocus: PropTypes.func,
  getPadTime: PropTypes.func,
  timer: PropTypes.func,
  pause: PropTypes.func,
};

export default TodoList;
