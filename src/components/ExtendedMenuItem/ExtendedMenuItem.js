import React from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Paragraph,
  Heading,
  Text,
  Button,
  Icon,
  IconButton,
  Popover,
  Menu
} from 'evergreen-ui';
import Loader from '../Loader';
import StateAction from '../StateAction'
import OnClickMenu from '../OnClickMenu'

class ExtendedMenuItem extends React.Component {
  render() {
    const { details, menu } = this.props;

    return (
      <Pane paddingLeft={8}>
        <Pane display='flex' justifyContent='space-between'> 
          {
            details && Object.keys(details).length ? (
              <Pane>
                <Heading fontSize={12} lineHeight={2}>{details.title || details.name}</Heading>
                <Text fontSize={11}>{details.description}</Text>
              </Pane>
            ) : null
          }
          {menu && <OnClickMenu menuList={menu.list} selectedItem={menu.selectedItem} /> || null}
        </Pane>
        {/* // @Anna change footer to dynamic use (actions feature) */}
        <Pane is="footer" display='flex' alignItems="center" justifyContent="space-between">
          <StateAction actions={details.actions}/>
          <Button padding={8} lineHeight={0} iconBefore='console' appearance="minimal" color='rgba(67, 90, 111, 0.7)'>Logs</Button>
        </Pane>
      </Pane>
    );
  }
} 

ExtendedMenuItem.propTypes = {
  details: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired
};

export default ExtendedMenuItem;
