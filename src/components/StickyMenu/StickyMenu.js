import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Menu } from 'evergreen-ui';
import Box from 'ui-box';
import Loader from '../Loader';
import MutMenuItem from './MenuItem';

class StickyMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: ''
    }
  }

  changeSelectedColor = (item) => {
    this.setState({ selected: item});
  }

  render() {
    const { selected } = this.state;
    const { primaryMenu, secondaryMenu, stickBottom, loading, selectedColor, ...others } = this.props;

    return (
      <Box
        width="80px"
        paddingTop="10px"
        background="#525F7F"
        flexShrink={0}
        zIndex={9}
        {...others}
      >
        <Pane
          display="flex"
          flexDirection="column"
          overflow="auto"
          position="sticky"
          top="0"
          left="0"
          height="100vh" 
          overflowX="hidden"
        >
          {
            loading ? <Loader theme={{spinnerColor: '#ffffff'}} /> :
            <Menu>
              <Menu.Group>
                {
                  primaryMenu.map((pm, index) => {
                    const props = {};
                    if (pm.icon) props.icon = pm.icon;
                    const children = pm.logo || pm.name || 'Set name or logo';
                    return (
                      <MutMenuItem
                        key={`pm-${index}`}
                        active={pm.active}
                        props={pm.props}
                        {...props}
                        selected={selected}
                        selectedColor={selectedColor}
                        changeSelectedColor={(item) => this.changeSelectedColor(item)}
                      >{children}</MutMenuItem>
                    )
                  })
                }
              </Menu.Group>
              {
                secondaryMenu &&
                <Pane position='absolute' bottom={stickBottom ? 0 : 'auto'}>
                  <Menu.Divider />
                  <Menu.Group>
                    {
                      secondaryMenu.map((pm, index) => {
                        const props = {};
                        if (pm.icon) props.icon = pm.icon;
                        const children = pm.logo || pm.name || 'Set name or logo';

                        return (
                          <MutMenuItem
                            key={`pm-${index}`}
                            props={pm.props}
                            active={pm.active}
                            selected={selected}
                            selectedColor={selectedColor}
                            changeSelectedColor={(item) => this.changeSelectedColor(item)}
                            {...props}
                          >{children}</MutMenuItem>
                        )
                      })
                    }
                  </Menu.Group>
                </Pane>
              }
            </Menu>
          }
        </Pane>
      </Box>
    );
  }
}

StickyMenu.defaultProps = {
  loading: false,
  stickBottom: false,
  secondaryMenu: [],
}

StickyMenu.propTypes = {
  loading: PropTypes.bool,
  primaryMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
  secondaryMenu: PropTypes.arrayOf(PropTypes.object),
  stickBottom: PropTypes.bool
};


export default StickyMenu;
