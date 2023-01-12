import React from 'react';

class InputEdit extends React.Component {
  state = {
    label: this.props.label,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label === '' || this.state.label.split(' ').length - 1 === this.state.label.length) {
      return;
    }
    this.props.editInput(this.props.id, this.state.label);
    this.setState({
      label: this.state.label,
    });
    this.props.onEditing();
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    const { id } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          id={id}
          label="Editing"
          type="text"
          className="edit"
          defaultValue={this.state.label}
          onChange={this.onLabelChange}
        />
      </form>
    );
  }
}

export default InputEdit;
