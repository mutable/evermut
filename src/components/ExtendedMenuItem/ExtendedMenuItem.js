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
import OnClickMenu from '../OnClickMenu'

class ExtendedMenuItem extends React.Component {
  render() {
    const { details } = this.props;

    return (
      <Pane paddingLeft={8}>
        <Pane display='flex' justifyContent='space-between'> 
          {
            details && Object.keys(details).length && Object.keys(details).map((item) => {
              if(item !== 'actions' && item !== 'menu') {
                let drawable = <Text fontSize={11}>{details[item]}</Text>
                if(item === 'title' || item === 'name') {
                  drawable = <Heading fontSize={12} lineHeight={2}>{details[item]}</Heading>
                }
                return drawable;
              }
            }) || null
          }
          {details.menu && <OnClickMenu menuList={details.menu.list} onClick={details.menu.onClick} /> || null}
        </Pane>
        <Pane is="footer" display='flex' alignItems="center" justifyContent="space-between">
          {
            details.actions && details.actions.length && details.actions.map((item) => item) || null
          }
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

// <Pane>
//                 <Heading fontSize={12} lineHeight={2}>{details.title || details.name}</Heading>
//                 <Text fontSize={11}>{details.description}</Text>
//               </Pane>
//             ) : null