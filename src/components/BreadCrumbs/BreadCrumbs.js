import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Icon, IconButton, Button, Paragraph, Select } from 'evergreen-ui';
import Loader from '../Loader';
import ToggleMenu from '../ToggleMenu';

class BreadCrumbs extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: false,
      url: ''
    }
    console.log('constructor')
  }
  click(item) {
    console.log('clicked ee', item)
    // if(item.id !== 'undefined') this.setState({url: url + item.id})
  }
  getAppearance(item, last, index) {
    const { url } = this.state;
    console.log('url')
    let text = '';

    if(typeof item.name !== 'string') {
      text = (
        <Select
          onChange={(e) => this.click(e)}
        >
          {
            item.name.length && item.name.map((value, index) => {
              return <option value={value.name} key={`options-${index}`}>{value.name}</option>
            })
          }
        </Select>
      );
    } else {
      text = <Paragraph is='a' onClick={() => this.props.onClick(item)}>{item.name}</Paragraph>;
    }
    return (
      <Text>
        {text}
        {!last ? '/ ' : ''}
      </Text>
    );
  }

  render() {
    const { pathArray, loading } = this.props;

    return ( loading ? <Loader /> :
      <Pane>
        {pathArray && pathArray.length && pathArray.map((item, index) => {
          return this.getAppearance(item, index === pathArray.length - 1, index);
        })}
      </Pane>
    )
  }
}

BreadCrumbs.defaultProps = {
  loading: false
}

BreadCrumbs.propTypes = {
  loading: PropTypes.bool,
};

export default BreadCrumbs;
