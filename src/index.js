import React from "react";
import ReactDOM from "react-dom";

import Footer from "./components/footer";
import Header from "./components/header";
import TodoList from "./components/todo-list";

import "./index.css";
const App = () => {
  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TodoList />
        <Footer />
      </section>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
