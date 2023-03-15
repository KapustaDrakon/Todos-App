import React from 'react';
import Proptypes from 'prop-types';

import './Footer.css';
import { Filter } from '../Filter';

const Footer = ({ filter, itemsLeft, onFilterChange, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <Filter onFilterChange={onFilterChange} filter={filter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  clearCompleted: () => {},
  itemsLeft: 0,
};

Footer.propTypes = {
  clearCompleted: Proptypes.func,
  itemsLeft: Proptypes.number,
};

export default Footer;
