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
import ToggleMenu from '../ToggleMenu'

class ExtendedMenuItem extends React.Component {
  render() {
    const { details } = this.props;

    return (
      <Pane>
        <Pane display='flex' justifyContent='space-between'>
          {
            (details.title || details.name) &&
            <Heading fontSize={12} lineHeight={2}>{details.title || details.name}</Heading>
          }
          {details.menu && <ToggleMenu menuList={details.menu.list} onClick={details.menu.onClick} /> || null}
        </Pane> 
        <Pane textAlign='start'> 
          {
            details && Object.keys(details).length && Object.keys(details).map((item) => {
             if(item !== 'actions' && item !== 'menu' && item !== 'id' && (item !== 'title' && item !== 'name')) {
              if(typeof details[item] === 'object') {
                const objectArray =  details[item];
                return Object.keys(objectArray).map((key, index) => {
                  const comma = (index !== Object.keys(objectArray).length-1) ? ', ' : '';
                  return <Text fontSize={11} key={`obj-type-key-${index}`}>{objectArray[key]}{comma}</Text>
                })
              }
                return <Text fontSize={11} display='block'>{details[item]}</Text>
              }
            }) || null
          }
        </Pane>
        <Pane> 
          {details.id && <Text display='block' fontSize={11} textAlign='start'>ID {details.id}</Text>}
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
  details: PropTypes.object.isRequired
};

export default ExtendedMenuItem;
