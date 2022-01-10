import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button.styled';

const LoadButton = ({ onClick }) => {
  return <Button onClick={onClick}>Load more</Button>;
};

LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadButton;
