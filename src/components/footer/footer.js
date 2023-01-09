import React from "react";
import Proptypes from "prop-types";
import "./footer.css";
import Filter from "./filters";

class Footer extends React.Component {

  render() {
    const { filter, itemsLeft, onFilterChange, clearCompleted} = this.props;

    return (
      <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <Filter 
        onFilterChange={onFilterChange}
        filter={filter}
      />
      <button 
        className="clear-completed"
        onClick={() => clearCompleted()}
        >Clear completed</button>
    </footer>
  )
  }
};

Footer.defaultProps = {
  clearCompleted: () => {},
  itemsLeft: 0
}

Footer.propTypes = {
  clearCompleted: Proptypes.func,
  itemsLeft: Proptypes.number
}

export default Footer;