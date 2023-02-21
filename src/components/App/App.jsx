import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import { Footer } from '../Footer';
import { HeaderInput } from '../HeaderInput';
import { TodoList } from '../TodoList';

import './App.css';

export default class App extends React.Component {
  maxId = 100;
  intervalId = {};

  state = {
    todoData: [
      this.createTodoItem('123 task', 10, new Date() - 400000),
      this.createTodoItem('Complete task', 5, new Date() - 6400000 * 2),
      this.createTodoItem('Editing task', 134, new Date() - 86400000 * 3),
      this.createTodoItem('Active task', 154, new Date() - 86400000 * 4),
      this.createTodoItem('New task', 135, new Date() - 86400000 * 5),
      this.createTodoItem('Task task', 104, new Date() - 86400000 * 6),
      this.createTodoItem('123', 111, new Date() - 86400000 * 7),
    ],
    filter: 'all',
    timeLeft: 0,
  };

  onStart = (item) => {
    if (item.timeleft === 0) {
      this.onPause(item.id);
      return;
    }
    if (item.completed) {
      this.onPause(item.id);
      return;
    }
    if (item.timeleft >= 1) {
      item.timeleft -= 1;
    }
    return this.setState({
      timeLeft: item.timeleft,
    });
  };

  timer = (item) => {
    if (this.intervalId[item.id]) return;
    const intervals = { ...this.intervalId };
    intervals[item.id] = setInterval(() => this.onStart(item), 1000);
    this.intervalId = intervals;
  };

  onPause = (idx) => {
    clearInterval(this.intervalId[idx]);
    this.intervalId[idx] = null;
  };

  createTimeGone(time) {
    return formatDistanceToNow(new Date(time), {
      includeSeconds: true,
      addSuffix: true,
    });
  }

  createTodoItem(label, timeleft, timeGone) {
    return {
      label,
      timeleft,
      time: `created ${this.createTimeGone(timeGone)}`,
      id: this.maxId++,
      completed: false,
      editing: false,
    };
  }

  getPadTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  addItem = (text, min, sec) => {
    const timeleft = min * 60 + sec;
    const newItem = this.createTodoItem(text, timeleft, new Date());
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
    }, 0);
  };

  onEditing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.itemProperty(todoData, id, 'editing'),
      };
    });
  };

  filterChange(items, filter) {
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
    const visibleItems = this.filterChange(this.state.todoData, this.state.filter);
    const todoItemsLeft = this.state.todoData.length - this.state.todoData.filter((el) => el.completed).length;

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
            getPadTime={this.getPadTime}
            timer={this.timer}
            pause={this.onPause}
          />
          <Footer
            itemsLeft={todoItemsLeft}
            filter={this.filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
