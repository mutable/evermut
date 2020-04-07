import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, SideSheet, Icon, IconButton } from 'evergreen-ui';
// import { Logo } from 'evermut';
// import logo from "../../logo-light.svg";
// import logoDark from "../../logo-dark.svg";

const PADDING = 15;
const MARGIN = 15;
const FONT_SIZE = 16;
const MENU_HEIGHT = 63;
const LOGO_HEIGHT = 40;
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

  _getBackground = item => {
    const { path } = this.props;

    let background = COLORS.DEFAULT;
    if (path.includes(item)) background = COLORS.SELECTED;

    return background;
  }

  getBurgerMenu() {
    const { path } = this.props;

    return (
      <Pane margin={MARGIN*2}>
        <Text
          cursor="pointer"
          fontSize={FONT_SIZE}
          display='flex'
          alignItems='center'
          background={this._getBackground("stacks")}
          paddingBottom={PADDING}
          paddingTop={PADDING}
          paddingLeft={PADDING}
          onClick={() => this.handleChange('/stacks')}
          borderBottom='default'
        >
          <Icon icon="stacked-chart" marginRight={MARGIN} size={16} /> Stacks
        </Text>
        <Text
          cursor="pointer"
          fontSize={FONT_SIZE}
          display='flex'
          alignItems='center'
          background={this._getBackground("appDocumentation")}
          paddingBottom={PADDING}
          paddingTop={PADDING}
          paddingLeft={PADDING}
          onClick={() => this.handleChange('/appDocumentation')}
          borderBottom='default'
        >
          <Icon icon="document" marginRight={MARGIN} size={16} /> Local App Docs
        </Text>
        <Text
          cursor="pointer"
          fontSize={FONT_SIZE}
          display='flex'
          alignItems='center'
          background={this._getBackground("settings")}
          paddingBottom={MARGIN}
          paddingTop={MARGIN}
          paddingLeft={MARGIN}
          onClick={() => this.handleChange('/settings')}
        >
          <Icon icon="settings" marginRight={MARGIN} size={16} /> Settings
        </Text>
        <Text
          cursor="pointer"
          fontSize={FONT_SIZE}
          display='flex'
          background={this._getBackground("account")}
          alignItems='center'
          paddingBottom={MARGIN}
          paddingTop={MARGIN}
          paddingLeft={MARGIN}
          onClick={() => this.handleChange('/account')}
        >
          <Icon icon="people" marginRight={MARGIN} size={16} /> Account
        </Text>
        <Text
          cursor="pointer"
          fontSize={FONT_SIZE}
          display='flex'
          alignItems='center'
          paddingBottom={MARGIN}
          paddingTop={MARGIN}
          paddingLeft={MARGIN}
          onClick={() => this.handleChange('/logout')}
        >
          <Icon icon="log-out" marginRight={MARGIN} size={16} /> Log Out
        </Text>
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

  handleChange(toWhere) {
    const { history } = this.props;

    if(toWhere) history.push(toWhere);
    this.closeBurgerMenu();
  }

  render() {
    const { openMenu } = this.state;
// <Logo src={logo} style={{ height: LOGO_HEIGHT }}/>
// <Logo src={logoDark} style={{ height: LOGO_HEIGHT, margin: MARGIN }}/>
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
      >
        <Text
          height="auto"
          margin={MARGIN}
        >
          
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

}

HorizontalMenu.propTypes = {

}

export default HorizontalMenu;
