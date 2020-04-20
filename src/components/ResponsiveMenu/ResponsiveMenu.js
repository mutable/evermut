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
      selectedColorSticky,
      selectedColorHorizontal,
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
      selectedColor={selectedColorSticky}
      stickBottom={stickBottom}
      loading={loading}
      {...stickyStyle}
    />)
      || <HorizontalMenu
        primaryMenu={primaryMenuHorizontal}
        secondaryMenu={secondaryMenuHorizontal}
        selectedColor={selectedColorHorizontal}
        logo={logo}
        listLogo={listLogo}
        {...horizontalStyle}
      />)
  }
}

ResponsiveMenu.defaultProps = {
  isHorizontal: false
}

ResponsiveMenu.propTypes = {
  primaryMenuSticky: PropTypes.array.isRequired,
  primaryMenuHorizontal: PropTypes.array.isRequired,
  secondaryMenuSticky: PropTypes.array,
  secondaryMenuHorizontal: PropTypes.array,
  isHorizontal: PropTypes.bool,
  loading: PropTypes.bool,
  stickBottom: PropTypes.bool,
  selectedColorSticky: PropTypes.string,
  selectedColorHorizontal: PropTypes.string,
  stickyStyle: PropTypes.object,
  horizontalStyle: PropTypes.object,
  logo: PropTypes.element,
  listLogo: PropTypes.element
};

export default ResponsiveMenu;
