import React, { Component } from 'react';

// Reference to https://github.com/sindresorhus/ansi-regex
const reAnsi = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;

const _openTags = {
  0: 'resetall',
  1: 'bold',
  2: 'dim',
  3: 'italic',
  4: 'underline',
  5: 'blink',
  7: 'reverse',
  8: 'hidden',
  9: 'delete',
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey',
  39: 'default',
  90: 'darkgrey'
};

class AnsiHtml extends Component {
  makeAnsi = (text) => {
    if (!reAnsi.test(text)) return text;

    const segments = text.split(/\033\[(\d+)*m/);
    const arr = [];
    if (segments[0] === '' || segments[0] === ' ') {
      segments.shift();
    }
    
    if (
      segments[segments.length - 1] === ''
      || segments[segments.length - 1] === ' '
    ) {
      segments.pop();
    }
  
    const isDigits = new RegExp('^\\d+$');
      
    if (!isDigits.test(segments[0])) {
      segments.unshift('0');
    }

    segments.forEach((value, index) => {
      if (index % 2 === 1) {
        const ot = _openTags[segments[index - 1]] || 'default';
        arr.push(<span className={`ansi-${ot}`}>{value}</span>);
      }
    });

    return arr;
  }

  render() {
    const { text } = this.props;

    return (
      <span className="ansi">
        {this.makeAnsi(text)}
      </span>
    );
  }
}

export default AnsiHtml;
