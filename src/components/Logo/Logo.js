import React from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';
import Loader from '../Loader';

const Logo = ({ src, style, loading }) => {
  return ( loading ? <Loader /> : <Box
    is="img"
    src={src}
    {...style}
  />);
}

Logo.defaultProps = {
  style: {
    height: 60
  },
  loading: false
}

Logo.propTypes = {
  loading: PropTypes.bool,
  src: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default Logo;
