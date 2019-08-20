import React from 'react';
import { Pane, Spinner } from 'evergreen-ui';

const Loader = () => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex={1}
      height='100vh'
      width='100%'
    >
      <Spinner />
    </Pane>
  )
}

export default Loader;
