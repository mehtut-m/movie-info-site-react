import React from 'react';
import Proptypes from 'prop-types';

function Button(props) {
  return (
    <button
      onClick={props.onClick ? () => props.onClick() : null}
      className={`btn ${props.className}`}
    >
      {props.chlidren}
    </button>
  );
}

const OutlineButton = (props) => {
  return (
    <Button className={`btn-outline ${props.className}`}>
      {props.chlidren}
    </Button>
  );
};

Button.propTypes = {
  onClick: Proptypes.func,
};

export default Button;
