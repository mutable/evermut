import React from 'react';
import PropTypes from 'prop-types';
import { Text, IconButton, Popover, Menu } from 'evergreen-ui';
import Loader from '../Loader';

class ToggleMenu extends React.Component {
  render() {
    const { menuList } = this.props;

    return (
      <Popover
        position='bottom-right'
        minWidth={0}
        content={
          <Menu>
            <Menu.Group>
              {
                menuList && menuList.length && menuList.map((item, index) => {
                  return (
                    <Menu.Item
                      onSelect={() => this.props.onClick(item)}
                      fontSize={12}
                      color='#425A70'
                      key={`ToggleMenuItem-${index}`}
                    >
                      <Text fontSize={12}>{item.name}</Text>
                    </Menu.Item>
                  )
                })
              }
            </Menu.Group>
          </Menu>
        }
      >
        <IconButton icon='more' transform="rotate(90deg)" appearance="minimal"/>
      </Popover>
    )
  }
}

ToggleMenu.propTypes = {
  menuList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ToggleMenu;
