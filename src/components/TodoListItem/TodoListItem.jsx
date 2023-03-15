import PropTypes from 'prop-types';

import './TodoListItem.css';
import { InputEdit } from '../InputEdit';

const TodoListItem = ({
  onDeleted,
  onCompleted,
  onEditing,
  id,
  editInput,
  inputFocus,
  getPadTime,
  item,
  timer,
  pause,
}) => {
  if (item.timeleft === undefined) {
    item.timeleft = 0;
  }
  const minutes = getPadTime(Math.floor(item.timeleft / 60));
  const seconds = getPadTime(item.timeleft - minutes * 60);

  let classNames = '';
  if (item.completed) {
    classNames += ' completed';
  }

  if (item.editing) {
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
          onChange={() => pause(item.id)}
        />
        <label htmlFor={'button-complete' + id}>
          <span className="title">{item.label}</span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={() => timer(item)} />
            <button type="button" className="icon icon-pause" onClick={() => pause(item.id)} />
            <span className="timer">{`${minutes}:${seconds}`}</span>
          </span>
          <span className="description">{item.time}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditing} onFocus={inputFocus(id)}></button>
        <button type="button" className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <InputEdit label={item.label} onEditing={onEditing} id={id} editInput={editInput} />
    </li>
  );
};

TodoListItem.defaultProps = {
  label: 'New task',
  min: undefined,
  sec: undefined,
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
