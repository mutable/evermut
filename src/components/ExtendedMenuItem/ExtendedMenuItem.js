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
    const { details, selectItemFooter } = this.props;

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
          {details.menu && <OnClickMenu menuList={details.menu.list} onClick={details.menu.onClick} /> || null}
        </Pane>
        <Pane is="footer" display='flex' alignItems="center" justifyContent="space-between">
        {
          selectItemFooter && selectItemFooter.length && selectItemFooter.map((item) => {
            const itemProps = {
              props: item.props,
              details
            }
            return React.createElement(item.type, itemProps)
          }) || null
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
