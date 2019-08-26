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

  getTooltip(item, color) {
    return (
      <Tooltip content={item}>
        <Icon icon="dot" color={color} marginRight={2} size={22} />
      </Tooltip> 
    );
  }

  render() {
    const { actions, tooltip, onClick, loading} = this.props;

    return ( loading ? <Loader /> :
      <Pane>
      {
        actions && actions.length && actions.map((item, index) => {
          const actionStuff = this.getIconColor(item)
          return (
            <Pane display='inline-flex' alignItems="center" key={`stateAction-${index}`}>
              {
                tooltip && this.getTooltip(item, actionStuff.color)
                || <>
                  <Icon icon="dot" color={actionStuff.color} marginRight={2} size={22} />
                  <Text fontSize={11}>{item}</Text>
                </>
              }
              <IconButton onClick={() => onClick(item)} marginLeft={4} icon={actionStuff.icon} appearance="minimal" />
            </Pane>
          );
        })
      || null }
      </Pane>
    )
  }
}

StateAction.defaultProps = {
  tooltip: false, 
  loading: false
}

StateAction.propTypes = {
  loading: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.oneOf(['running', 'waiting', 'warning', 'stopped'])).isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.bool
};

export default StateAction;
