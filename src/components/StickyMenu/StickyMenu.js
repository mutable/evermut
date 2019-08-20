import React from 'react';
import { Pane, Menu } from 'evergreen-ui';
import Box from 'ui-box';
import MutMenuItem from './MenuItem';

class StickyMenu extends React.Component {
  render() {
    const { primaryMenu, secondaryMenu } = this.props;

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
                primaryMenu.map(pm => {
                  const props = {};
                  if (pm.icon) props.icon = pm.icon;
                  const children = pm.logo || pm.name || 'Set name or logo';
                  return (
                    <MutMenuItem
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
                <Menu.Group>
                  {
                    secondaryMenu.map(pm => {
                      const props = {};
                      if (pm.icon) props.icon = pm.icon;
                      const children = pm.logo || pm.name || 'Set name or logo';

                      return (
                        <MutMenuItem
                          props={pm.props}
                          {...props}
                        >{children}</MutMenuItem>
                      )
                    })
                  }
                </Menu.Group>
              </>
            }
          </Menu>
        </Pane>
      </Box>
    );
  }
}

export default StickyMenu;
