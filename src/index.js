import React from "react";
import ReactDOM from "react-dom";

import Footer from "./components/footer";
import Header from "./components/header";
import TodoList from "./components/todo-list";

import "./index.css";
class App extends React.Component {

  state = {
    todoData: [
      {label: 'Complete task', time: 'created 17 seconds ago', id: 1},
      {label: 'Editing task', time: 'created 5 minutes ago', id: 2},
      {label: 'Active task', time: 'created 5 minutes ago', id: 3},
      {label: 'asd task', time: 'created 17 seconds ago', id: 4},
      {label: '123 task', time: 'created 5 minutes ago', id: 5},
      {label: 'qwerty task', time: 'created 5 minutes ago', id: 6},
    ]
  }

  itemDelete = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [ ...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray
      }
    })
  }

  render(){
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TodoList 
            todos={this.state.todoData}
            onDeleted={this.itemDelete}
          />
          <Footer />
        </section>
      </section>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
