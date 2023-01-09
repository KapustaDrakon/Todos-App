import React from "react";
import PropTypes from "prop-types";
import "./todo-list-item.css";

class TodoListItem extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEditing();
  }


  render() {
    const { label, time, onDeleted, onCompleted, onEditing, completed, editing } = this.props;

    let classNames = "";
    if (completed) {
      classNames += ' completed';
    }

    if (editing) {
      classNames += " editing";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle" 
            type="checkbox" 
            onClick={onCompleted}/>
          <label>
            <span className="description" >{label}</span>
            <span className="created">{time}</span>
          </label>
          <button 
            className="icon icon-edit"
            onClick={onEditing}
            >
          </button>
          <button 
            className="icon icon-destroy"
            onClick={onDeleted}>
          </button>
        </div>
        <form onSubmit={this.onSubmit} autoFocus>
          <input type="text" className="edit" defaultValue={label} />
        </form>
      </li>
    );
  }
};

TodoListItem.defaultProps = {
  label: 'New task',
  time: 'created some minutes ago',
  completed: false,
  editing: false
}

TodoListItem.propTypes = {
  label: PropTypes.string,
  time: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool
}

export default TodoListItem;
