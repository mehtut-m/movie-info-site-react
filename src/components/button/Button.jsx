import React from 'react';
import Proptypes from 'prop-types';
import './button.scss';

function Button(props) {
  return (
    <button
      onClick={props.onClick ? () => props.onClick() : null}
      className={`btn ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export const OutlineButton = (props) => {
  return (
    <Button
      onClick={props.onClick ? () => props.onClick() : null}
      className={`btn-outline ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

Button.propTypes = {
  onClick: Proptypes.func,
};

export default Button;
