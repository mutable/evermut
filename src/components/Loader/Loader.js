import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Spinner } from 'evergreen-ui';

const Loader = ({ style, height, ...rest }) => {
  const props = Object.keys(style).length ? { theme: style } : {};

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex={1}
      height={height}
      width='100%'
      {...rest}
    >
      <Spinner {...props} />
    </Pane>
  )
}

Loader.propTypes = {
  style: PropTypes.object,
  height: PropTypes.string
}

Loader.defaultProps = {
  style: {},
  height: '100vh'
}

export default Loader;
