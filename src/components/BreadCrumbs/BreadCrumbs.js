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
  }
  click(item) {
    // console.log('clicked ee', item)
  }
  getAppearance(item, last, index) {
    const { url } = this.state;
    // this.setState({url: url + item.name})
    let text = ''
    if(typeof item.name !== 'string') {
      text = (
        <Select
          onChange={e => this.click(e)}
        >
          {item.name.length && item.name.map((value, index) => <option key={`options-${index}`}>{value.name}</option>)}
        </Select>
      );
    } else {
      text = <Paragraph is='a' href={item.link}>{item.name}</Paragraph>;
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
