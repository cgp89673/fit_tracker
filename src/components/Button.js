import React from 'react';

import './Button.css';

const Button = (props) => {
  const { width, height } = props;
  
  return (
    <button style={{ width, height }}
      className="button"
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
