import React from 'react';
import PropTypes from 'prop-types';
import './HeaderInput.css';

class HeaderInput extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.label !== '' && this.state.label.split(' ').length - 1 !== this.state.label.length) {
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.onSubmit}>
          <input
            label="NewTask"
            className="new-todo"
            type="text"
            placeholder="What needs to be done?"
            autoFocus={true}
            onChange={this.onLabelChange}
            value={this.state.label}
          />
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
