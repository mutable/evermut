import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, SideSheet } from 'evergreen-ui';

const MARGIN = 15;
const WIDTH = 620;

class ResponsiveSideSheet extends React.Component {
  _closeSideSheet() {
    const { onClose } = this.props;

    if(onClose) onClose();
  }

  render() {
    const { component, isOpen, isFullWidth, closeButtonStyle } = this.props;
    const width = isFullWidth ? '100%' : WIDTH;

    return (
      <SideSheet
        position='right'
        width={width}
        isShown={isOpen}
        onCloseComplete={() => this._closeSideSheet()}
      >
        {isFullWidth &&
          <IconButton
            icon="cross"
            appearance="minimal"
            height={40}
            onClick={() => this._closeSideSheet()}
            position='absolute'
            right={0}
            top={0}
            margin={MARGIN}
            {...closeButtonStyle}
          />
        }
        {component}
      </SideSheet>
    )
  }
}

ResponsiveSideSheet.defaultProps = {
  isFullWidth: false,
  closeButtonStyle: {}
}

ResponsiveSideSheet.propTypes = {
  component: PropTypes.elementType.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isFullWidth: PropTypes.bool,
  closeButtonStyle: PropTypes.object,
};

export default ResponsiveSideSheet;
