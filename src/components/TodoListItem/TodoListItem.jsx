import React from 'react';
import PropTypes from 'prop-types';

import './TodoListItem.css';
import { InputEdit } from '../InputEdit';

class TodoListItem extends React.Component {
  render() {
    const { label, time, onDeleted, onCompleted, onEditing, completed, editing, id, editInput, inputFocus } =
      this.props;

    let classNames = '';
    if (completed) {
      classNames += ' completed';
    }

    if (editing) {
      classNames += ' editing';
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input
            label="Completed button"
            className="toggle"
            type="checkbox"
            id={'button-complete' + id}
            onClick={onCompleted}
          />
          <label htmlFor={'button-complete' + id}>
            <span className="description">{label}</span>
            <span className="created">{time}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditing} onFocus={inputFocus(id)}></button>
          <button type="button" className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <InputEdit label={label} onEditing={onEditing} id={id} editInput={editInput} />
      </li>
    );
  }
}

TodoListItem.defaultProps = {
  label: 'New task',
  time: 'created some minutes ago',
  completed: false,
  editing: false,
};

TodoListItem.propTypes = {
  label: PropTypes.string,
  time: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
};

export default TodoListItem;
