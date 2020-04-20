import React from 'react';
import PropTypes from 'prop-types';
import StickyMenu from '../StickyMenu';
import HorizontalMenu from '../HorizontalMenu';

class ResponsiveMenu extends React.Component {
  render() {
    const {
      primaryMenuSticky,
      secondaryMenuSticky,
      primaryMenuHorizontal,
      secondaryMenuHorizontal,
      isHorizontal,
      selectedColor,
      loading,
      stickBottom,
      stickyStyle,
      horizontalStyle,
      logo,
      listLogo
    } = this.props;

    return ((!isHorizontal && <StickyMenu
      primaryMenu={primaryMenuSticky}
      secondaryMenu={secondaryMenuSticky}
      selectedColor={selectedColor}
      stickBottom={stickBottom}
      loading={loading}
      {...stickyStyle}
    />)
      || <HorizontalMenu
        primaryMenu={primaryMenuHorizontal}
        secondaryMenu={secondaryMenuHorizontal}
        selectedColor={selectedColor}
        logo={logo}
        listLogo={listLogo}
        {...horizontalStyle}
      />)
  }
}

ResponsiveMenu.defaultProps = {
  loading: false,
  isHorizontal: false,
  stickBottom: false,
  secondaryMenu: [],
}

ResponsiveMenu.propTypes = {
  primaryMenuSticky: PropTypes.array.isRequired,
  primaryMenuHorizontal: PropTypes.array.isRequired,
  secondaryMenuSticky: PropTypes.array,
  secondaryMenuHorizontal: PropTypes.array,
  isHorizontal: PropTypes.bool,
  loading: PropTypes.bool,
  stickBottom: PropTypes.bool,
  selectedColorSticky: PropTypes.string.isRequired,
  selectedColorHorizontal: PropTypes.string.isRequired,
  stickyStyle: PropTypes.object,
  horizontalStyle: PropTypes.object,
  logo: PropTypes.element,
  listLogo: PropTypes.element
};

export default ResponsiveMenu;
