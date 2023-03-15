import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './HeaderInput.css';

const HeaderInput = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (event) => {
    return setLabel(event.target.value);
  };

  const onMinChange = (event) => {
    return setMin(Number(event.target.value));
  };

  const onSecChange = (event) => {
    return setSec(Number(event.target.value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (label !== '' && label.split(' ').length - 1 !== label.length) {
      onItemAdded(label, min, sec);
      setLabel('');
      setMin('');
      setSec('');
      document.querySelector('.new-todo').focus();
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          label="NewTask"
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          autoFocus={true}
          onChange={onLabelChange}
          value={label}
          required
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinChange}
          value={min}
          required
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecChange}
          value={sec}
          required
        />
        <input type="submit" className="submit-input" />
      </form>
    </header>
  );
};

HeaderInput.defaultProps = {
  onItemAdded: () => {},
};

HeaderInput.propTypes = {
  onItemAdded: PropTypes.func,
};

export default HeaderInput;
