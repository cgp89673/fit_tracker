import React from 'react';

import './DeleteButton.css';

const DeleteButton = (props) => {
  const { width, height } = props;
  
  return (
    <button style={{ width, height }}
      className="button1"
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default DeleteButton;
