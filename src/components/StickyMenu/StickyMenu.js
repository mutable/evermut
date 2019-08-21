import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Menu } from 'evergreen-ui';
import Box from 'ui-box';
import MutMenuItem from './MenuItem';

class StickyMenu extends React.Component {
  render() {
    const { primaryMenu, secondaryMenu, stickBottom } = this.props;

    return (
      <Box
        width="80px"
        paddingTop="10px"
        background="#525F7F" // "#FF9A22"
        flexShrink={0}
        zIndex={9}
        // {...props}
      >
        <Pane
          display="flex"
          flexDirection="column"
          overflow="auto"
          position="sticky"
          top="0"
          left="0"
          height="100vh"
        >
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
                      props={pm.props}
                      {...props}
                    >{children}</MutMenuItem>
                  )
                })
              }
            </Menu.Group>
            {
              secondaryMenu && <>
                <Menu.Divider />
                <Pane position='absolute' bottom={stickBottom ? 0 : 'auto'}>
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
                            {...props}
                          >{children}</MutMenuItem>
                        )
                      })
                    }
                  </Menu.Group>
                </Pane>
              </>
            }
          </Menu>
        </Pane>
      </Box>
    );
  }
}

StickyMenu.propTypes = {
  primaryMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
  secondaryMenu: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default StickyMenu;
