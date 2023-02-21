import React from 'react';
import PropTypes from 'prop-types';
import './HeaderInput.css';

class HeaderInput extends React.Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onMinChange = (event) => {
    this.setState({
      min: Number(event.target.value),
    });
  };

  onSecChange = (event) => {
    this.setState({
      sec: Number(event.target.value),
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.label !== '' && this.state.label.split(' ').length - 1 !== this.state.label.length) {
      this.props.onItemAdded(this.state.label, this.state.min, this.state.sec);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            label="NewTask"
            className="new-todo"
            type="text"
            placeholder="What needs to be done?"
            autoFocus={true}
            onChange={this.onLabelChange}
            value={this.state.label}
            required
          />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinChange}
            value={this.state.min}
            required
          />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={this.state.sec}
            required
          />
          <input type="submit" className="submit-input" />
        </form>
      </header>
    );
  }
}

HeaderInput.defaultProps = {
  onItemAdded: () => {},
};

HeaderInput.propTypes = {
  onItemAdded: PropTypes.func,
};

export default HeaderInput;
