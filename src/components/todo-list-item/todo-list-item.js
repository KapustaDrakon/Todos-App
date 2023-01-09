import React from "react";
import "./todo-list-item.css";

class TodoListItem extends React.Component {

  state = {
    completed: false,
    editing: false
  }

  itemCompleted = () => {
    this.setState((state) => {
      return {
        completed: !state.completed
      }
    })
  }

  itemEditing = () => {
    this.setState((state) => {
      return {
        editing: !state.editing
      }
    })
  }

  render() {
    const { label, time, onDeleted } = this.props;
    const { completed, editing } = this.state;

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
            onClick={this.itemCompleted}/>
          <label>
            <span className="description">{label}</span>
            <span className="created">{time}</span>
          </label>
          <button 
            className="icon icon-edit"
            onClick={this.itemEditing}>
          </button>
          <button 
            className="icon icon-destroy"
            onClick={onDeleted}>
          </button>
        </div>
        <input type="text" className="edit" defaultValue={label} />
      </li>
    );
  }
};

export default TodoListItem;
