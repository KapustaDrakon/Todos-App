import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

const Filter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const filterButtons = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={clazz} key={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{filterButtons}</ul>;
};

Filter.defaultProps = {
  filter: '',
  onFilterChange: () => {},
};

Filter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default Filter;
