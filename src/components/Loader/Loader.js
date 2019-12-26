import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Spinner } from 'evergreen-ui';

const Loader = ({ style, height, ...rest }) => {
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
      <Spinner {...style} />
    </Pane>
  )
}

Loader.defaultProps = {
  style: {},
  height: '100vh'
}

Loader.propTypes = {
  style: PropTypes.object,
  height: PropTypes.string
}


export default Loader;
