import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { Footer } from '../Footer';
import { HeaderInput } from '../HeaderInput';
import { TodoList } from '../TodoList';

import './App.css';

const App = () => {
  const [todoData, setData] = useState([]);
  useEffect(() => {
    setData([
      createTodoItem('123 task', 10, new Date() - 400000),
      createTodoItem('Complete task', 224, new Date() - 6400000 * 2),
      createTodoItem('Editing task', 134, new Date() - 86400000 * 3),
      createTodoItem('Active task', 154, new Date() - 86400000 * 4),
      createTodoItem('New task', 135, new Date() - 86400000 * 5),
      createTodoItem('Task task', 104, new Date() - 86400000 * 6),
      createTodoItem('123', 111, new Date() - 86400000 * 7),
    ]);
  }, []);

  const [filter, setFilter] = useState('all');
  const [timeLeft, setTimeleft] = useState(0);

  const onStart = (item) => {
    if (item.timeleft === 0) {
      onPause(item.id);
      return timeLeft;
    }
    if (item.completed) {
      onPause(item.id);
      return;
    }
    if (item.timeleft >= 1) {
      item.timeleft -= 1;
    }
    return setTimeleft(item.timeleft);
  };

  //let intervalId = {};
  const [intervalId, setIntervalId] = useState({});
  const timer = (item) => {
    if (intervalId[item.id]) return;
    const intervals = { ...intervalId };
    intervals[item.id] = setInterval(() => onStart(item), 1000);
    //intervalId = intervals;
    setIntervalId(intervals);
  };

  const onPause = (idx) => {
    clearInterval(intervalId[idx]);
    intervalId[idx] = null;
  };

  const createTimeGone = (time) => {
    return formatDistanceToNow(new Date(time), {
      includeSeconds: true,
      addSuffix: true,
    });
  };

  //let maxId = 100;
  let [maxId, setMaxId] = useState(100);
  const getId = () => {
    setMaxId(++maxId);
    return maxId;
  };

  const createTodoItem = (label, timeleft, timeGone) => {
    return {
      label,
      timeleft,
      time: `created ${createTimeGone(timeGone)}`,
      id: getId(),
      completed: false,
      editing: false,
    };
  };

  const getPadTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const addItem = (text, min, sec) => {
    const timeleft = min * 60 + sec;
    const newItem = createTodoItem(text, timeleft, new Date());
    const newArr = [newItem, ...todoData];
    return setData(newArr);
  };

  const itemDelete = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    return setData(newArray);
  };

  const clearCompleted = () => {
    const unCompletedItems = todoData.filter((el) => !el.completed);
    return setData(unCompletedItems);
  };

  const itemProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onCompleted = (id) => {
    return setData(itemProperty(todoData, id, 'completed'));
  };

  const editInput = (id, newText) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = {
      ...oldItem,
      label: newText,
      editing: false,
    };
    return setData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const inputFocus = (id) => {
    setTimeout(() => {
      const input = document.getElementById(id);
      input.focus();
    }, 0);
  };

  const onEditing = (id) => {
    return setData(itemProperty(todoData, id, 'editing'));
  };

  const filterChange = (items, filter) => {
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
  };

  const onFilterChange = (filter) => {
    return setFilter(filter);
  };

  const visibleItems = filterChange(todoData, filter);
  const todoItemsLeft = todoData.length - todoData.filter((el) => el.completed).length;

  return (
    <section className="todoapp">
      <HeaderInput onItemAdded={addItem} />
      <section className="main">
        <TodoList
          todos={visibleItems}
          onDeleted={itemDelete}
          onCompleted={onCompleted}
          onEditing={onEditing}
          editInput={editInput}
          inputFocus={inputFocus}
          getPadTime={getPadTime}
          timer={timer}
          pause={onPause}
        />
        <Footer
          itemsLeft={todoItemsLeft}
          filter={filter}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};
export default App;
