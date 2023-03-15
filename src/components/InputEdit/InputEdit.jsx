import React, { useState } from 'react';

const InputEdit = ({ label, editInput, id }) => {
  const [labelState, setLabelState] = useState(label);

  const onSubmit = (event) => {
    event.preventDefault();
    if (labelState === '' || labelState.split(' ').length - 1 === labelState.length) {
      return;
    }
    editInput(id, labelState);
    setLabelState(labelState);
  };

  const onLabelChange = (event) => {
    setLabelState(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input id={id} label="Editing" type="text" className="edit" defaultValue={labelState} onChange={onLabelChange} />
    </form>
  );
};

export default InputEdit;
