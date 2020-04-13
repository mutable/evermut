import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import crypto from 'crypto';
import Long from 'long';
import { Pane, Text } from 'evergreen-ui';
import Ansihtml from './ansiHtml';
import { logDateFormat } from './helper';

import './index.css';

const STDOUT = 'stdout';
const STDERR = 'stderr';

const COLORS = {
  SIROCCO: '#7a7e7e',
  IRON: '#d2d8d8',
  BAHAMA_BLUE: '#016699',
  DARK: '#242424'
};

const FONT_SIZE = 12;

const LOGS_CONTENT = {
  PUSHING: "Pushing",
  MISSING_TYPE: "Missing type as string",
  MISSIN_MESSAGE: "Missing message as string"
};

class Logs extends PureComponent {
  _getLine = (log) => {
    let logType = log.type;

    switch (log.type) {
      case STDOUT:
        logType = 'basic';
        break;
      case STDERR:
        logType = 'error';
        break;
      default: break;
    }

    return (
      <Pane>
        <Pane display='inline' marginRight={5} marginLeft={5}>
          <Text
            display='inline-block'
            color={COLORS.SIROCCO}
            paddingRight={5}
            marginRight={5}
            marginLeft={5}
            fontSize={FONT_SIZE}
          >
            {logType}
          </Text>
          <Text
            display='inline-block'
            color={COLORS.SIROCCO}
            paddingRight={5}
            marginRight={5}
            marginLeft={5}
            fontSize={FONT_SIZE}
          >
            {logDateFormat(log.date, true)}
          </Text>
          <Text
            display={(log.count > 1 && log.count) ? 'inline-block' : 'none'}
            color={COLORS.IRON}
            background={COLORS.BAHAMA_BLUE}
            borderRadius='8px'
            paddingLeft={5}
            paddingRight={5}
            marginRight={5}
            marginLeft={5}
            fontSize={FONT_SIZE}
          >
            {(log.count > 1 && log.count) || ''}
          </Text>
        </Pane>
        <Ansihtml text={log.message} />
      </Pane>
    );
  }

  _getLogs = () => {
    const { logs } = this.props;
    let _logs = logs;

    if (_logs && _logs.length) {
      _logs = _logs.map((log) => {
        const message = log.message.substr(1);
        if (message === LOGS_CONTENT.PUSHING) return '';
        let timestamp;

        switch (typeof log.timestamp) {
          case 'object':
            timestamp = new Long(log.timestamp.low, log.timestamp.high, log.timestamp.unsigned);
            timestamp = timestamp.toNumber();
            break;
          case 'string':
            timestamp = parseInt(log.timestamp, 10);
            break;
          default:
            timestamp = log.timestamp;
        }

        return {
          type: log.type || STDOUT,
          date: new Date(timestamp),
          message,
          id: crypto.randomBytes(32).toString('hex')
        };
      }).filter(log => (log !== undefined && log !== ""));

      _logs = _logs.filter((log, index, logsArray) => {
        let flag = true;
        const next = logsArray.length > index + 1 ? logsArray[index + 1] : null;

        if (
          next && next.date && log && log.date
          && next.date.getTime() - log.date.getTime() < 100
          && log.type === next.type
          && log.message === next.message
        ) {
          next.count = log.count ? log.count + 1 : 1;
          flag = false;
        }

        return flag;
      });
    }

    if (_logs && _logs.length > 3000) _logs.shift();
    return _logs;
  }

  render() {
    const { ...style } = this.props;
    const logs = this._getLogs();

    return (
      <Pane width='100%' background={COLORS.DARK} height={450} overflowY='auto' overflowX='hidden' {...style}>
        {
          (logs && logs.length && logs.map((log) => {
            if (typeof log.type !== 'string') {
              return (
                <Pane key={`log-missing-type-${log.id.substring(1, log.id.length - 15)}`}>
                  <Text>{LOGS_CONTENT.PUSHING.MISSING_TYPE}</Text>
                </Pane>
              );
            }
            if (typeof log.message !== 'string') {
              return (
                <Pane key={`log-missing-message-${log.id.substring(1, log.id.length - 15)}`}>
                  <Text>{LOGS_CONTENT.PUSHING.MISSIN_MESSAGE}</Text>
                </Pane>
              );
            }
            return (
              <Pane key={`log-${log.id.substring(1, log.id.length - 15)}`}>
                {this._getLine(log)}
              </Pane>
            );
          })) || null
        }
      </Pane>
    );
  }
}

Logs.defaultProps = {
  style: {}
}

Logs.propTypes = {
  logs: PropTypes.array.isRequired,
  style: PropTypes.object
}

export default Logs;
