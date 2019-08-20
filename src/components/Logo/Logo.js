import React from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const Logo = ({ src, style }) => {
  return (<Box
    is="img"
    src={src}
    {...style}
  />);
}

Logo.defaultProps = {
  style: {
    height: 60,
    transform: 'rotate(-45deg) translateX(1px)'
  }
}

Logo.propTypes = {
  src: PropTypes.string.isRequired
}

export default Logo;
