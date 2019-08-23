import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Spinner } from 'evergreen-ui';

const Loader = ({ style }) => {
  const props = Object.keys(style).length ? { theme: style } : {};

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex={1}
      height='100vh'
      width='100%'
    >
      <Spinner {...props} />
    </Pane>
  )
}

Loader.propTypes = {
  style: PropTypes.object
}

Loader.defaultProps = {
  style: {}
}

export default Loader;
