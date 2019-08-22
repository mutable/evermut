import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Icon, IconButton, Tooltip } from 'evergreen-ui';
import Loader from '../Loader';

class StateAction extends React.Component {
  getIconColor(type) {
    const actionStuff = { color: 'success', icon: 'stop' };
    switch(type) {
      case 'waiting':
        actionStuff.color = '#F7D154';
        actionStuff.icon = 'send-to';
        break;
      case 'stopped':
        actionStuff.color = '#7B8B9A';
        actionStuff.icon = 'play';
        break;
      case 'warning':
        actionStuff.color = '#EC4C47';
        actionStuff.icon = 'warning-sign';
        break;
    }
    return actionStuff;
  }

  render() {
    const { actions } = this.props;

    return (
      <Pane>
      {
        actions && actions.length && actions.map((item) => {
          const actionStuff = this.getIconColor(item)
          return (
            <Pane display='inline-flex' alignItems="center">
              <Tooltip content={item}>
                <Icon icon="dot" color={actionStuff.color} marginRight={2} size={22} />
              </Tooltip>
              <Text fontSize={11}>{item}</Text>
              <IconButton marginLeft={4} icon={actionStuff.icon} appearance="minimal" />
            </Pane>
          );
        })
      || null }
      </Pane>
    )
  }
}

StateAction.propTypes = {
  actions: PropTypes.array.isRequired,
};

export default StateAction;
