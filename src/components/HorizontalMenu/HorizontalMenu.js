import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, SideSheet, Icon, IconButton } from 'evergreen-ui';

const PADDING = 15;
const MARGIN = 15;
const FONT_SIZE = 16;
const MENU_HEIGHT = 63;
const COLORS = {
  DEFAULT: 'white',
  SELECTED: '#f5f6f7',
  PRIMARY: '#525F7F'
}

class HorizontalMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      openMenu: false
    }
  }

  getBurgerMenu() {
    const { primaryMenu, secondaryMenu, selectedColor } = this.props;

    return (
      <Pane margin={MARGIN*2}>
        {primaryMenu && primaryMenu.map((item, index) => {
          const { name, props, icon, active } = item;
          return (
            <Text
              cursor="pointer"
              fontSize={FONT_SIZE}
              display='flex'
              alignItems='center'
              background={active && selectedColor}
              paddingBottom={PADDING}
              paddingTop={PADDING}
              paddingLeft={PADDING}
              {...props}
            >
              <Icon icon={icon} marginRight={MARGIN} size={16} /> {name}
            </Text>
          )
        })}
        <Pane borderBottom='default'></Pane>
        {secondaryMenu && secondaryMenu.map((item, index) => {
          const { name, props, icon, active } = item;
          return (
            <Text
              cursor="pointer"
              fontSize={FONT_SIZE}
              display='flex'
              alignItems='center'
              background={active && selectedColor}
              paddingBottom={PADDING}
              paddingTop={PADDING}
              paddingLeft={PADDING}
              {...props}
            >
              <Icon icon={icon} marginRight={MARGIN} size={16} /> {name}
            </Text>
          )
        })}
      </Pane>
    );
  }

  openBurgerMenu() {
    const { openMenu } = this.state;
    this.setState({ openMenu: !openMenu })
  }

  closeBurgerMenu() {
    this.setState({ openMenu: false })
  }

  render() {
    const { openMenu } = this.state;
    const { logo, listLogo, ...style } = this.props;

    return (
      <>
      <Pane
        height={MENU_HEIGHT}
        width='100%'
        background={COLORS.PRIMARY}
        display="flex"
        justifyContent='space-between'
        alignItems='center'
        position="sticky"
        top="0"
        left="0"
        zIndex={9}
        {...style}
      >
        <Text
          height="auto"
          margin={MARGIN}
        >
          {logo || null}
        </Text>
        <Text
          height="auto"
          cursor="pointer"
          margin={MARGIN}
        >
          <Icon
            onClick={() => this.openBurgerMenu()}
            icon="menu"
            appearance='minimal'
            size={20}
            style={{color: 'white'}}
          />
        </Text>
      </Pane>
      <SideSheet
        position='right'
        isShown={openMenu}
        width='100%'
        onCloseComplete={() => this.closeBurgerMenu()}
      >
        <Pane display='flex' justifyContent='space-between' alignItems='center'>
          {listLogo || null}
          <IconButton
            icon="cross"
            appearance="minimal"
            onClick={() => this.closeBurgerMenu()}
            margin={MARGIN}
          />
        </Pane>
        {this.getBurgerMenu()}
      </SideSheet>
      </>
    );
  }
}

HorizontalMenu.defaultProps = {
  secondaryMenu: [],
  selectedColor: COLORS.SELECTED
}

HorizontalMenu.propTypes = {
  primaryMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
  secondaryMenu: PropTypes.arrayOf(PropTypes.object),
  selectedColor: PropTypes.string,
  logo: PropTypes.elementType,
  listLogo: PropTypes.elementType
}

export default HorizontalMenu;
