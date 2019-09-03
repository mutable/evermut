import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Icon, IconButton, Tooltip } from 'evergreen-ui';
import Loader from '../Loader';

class Steps extends React.Component {
  render() {
    const { actions, tooltip, onClick, loading} = this.props;

    return ( loading ? <Loader /> :
      <Pane>
      hi
      </Pane>
    )
  }
}

Steps.defaultProps = {
  loading: false
}

Steps.propTypes = {
  loading: PropTypes.bool
};

export default Steps;
