import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import { Footer } from '../Footer';
import { HeaderInput } from '../HeaderInput';
import { TodoList } from '../TodoList';

import './App.css';

export default class App extends React.Component {
  maxId = 100;

  timeGone = formatDistanceToNow(new Date(), {
    includeSeconds: true,
    addSuffix: true,
  });

  state = {
    todoData: [
      this.createTodoItem('Complete task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
      this.createTodoItem('New task'),
      this.createTodoItem('Task task'),
      this.createTodoItem('123'),
    ],
    term: '',
    filter: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      time: `created ${this.timeGone}`,
      id: this.maxId++,
      completed: false,
      editing: false,
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [newItem, ...todoData];
      return {
        todoData: newArr,
      };
    });
  };

  itemDelete = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const unCompletedItems = todoData.filter((el) => !el.completed);
      return {
        todoData: unCompletedItems,
      };
    });
  };

  itemProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.itemProperty(todoData, id, 'completed'),
      };
    });
  };

  editInput = (id, newText) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        label: newText,
      };
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      };
    });
  };

  inputFocus = (id) => {
    setTimeout(() => {
      const input = document.getElementById(id);
      input.focus();
      input.select();
    }, 0);
  };

  onEditing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.itemProperty(todoData, id, 'editing'),
      };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const todoItemsLeft = todoData.length - todoData.filter((el) => el.completed).length;

    return (
      <section className="todoapp">
        <HeaderInput onItemAdded={this.addItem} />
        <section className="main">
          <TodoList
            todos={visibleItems}
            onDeleted={this.itemDelete}
            onCompleted={this.onCompleted}
            onEditing={this.onEditing}
            editInput={this.editInput}
            inputFocus={this.inputFocus}
          />
          <Footer
            itemsLeft={todoItemsLeft}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
