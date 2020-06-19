import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'evergreen-ui';

const BACK_CONTENT = 'Back';
const MARGIN = '30px';

class BackButton extends React.Component {
  onClick() {
    const { goBack } = this.props;

    goBack && goBack();
  }

  render() {
    const { name, goBack, ...style } = this.props;

    return (
      <Button
        display='block'
        color='default'
        marginBottom={MARGIN}
        iconBefore="arrow-left"
        appearance='minimal'
        onClick={() => this.onClick()}
        {...style}
      >{name}</Button>
    );
  }
}

BackButton.defaultProps = {
  name: BACK_CONTENT
}

BackButton.propTypes = {
  name: PropTypes.string,
  goBack: PropTypes.func.isRequired
};

export default BackButton;
