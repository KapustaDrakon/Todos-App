import React from "react";
import "./footer.css";
import Filter from "../filters";

const Footer = () => {
    return (
        <footer className="footer">
        <span className="todo-count">1 items left</span>
        <Filter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    )
};

export default Footer;