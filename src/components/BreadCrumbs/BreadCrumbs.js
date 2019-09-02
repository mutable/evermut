import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Icon, IconButton, Button, Paragraph, Select } from 'evergreen-ui';
import Loader from '../Loader';
import ToggleMenu from '../ToggleMenu';

class BreadCrumbs extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: false
    }
  }
  click(event, list) {
    const { onClick } = this.props;
    if(onClick) onClick({selected: event.target.value, list});

    this.setState({ selected: event.target.value});
  }
  getAppearance(item, last, index) {
    const { selected } = this.state;
    let text = '';

    if(typeof item.name !== 'string') {
      text = (
        <Select
          value={selected}
          onChange={(e) => this.click(e, item.name)}
        >
          {
            item.name.length && item.name.map((value, index) => {
              return <option value={value.id} key={`options-${index}`}>{value.name}</option>
            })
          }
        </Select>
      );
    } else {
      text = <Paragraph
        is='a'
        textDecoration={item.link ? 'underline' : 'none'}
        cursor={'pointer'} onClick={() => this.props.onClick(item)}
      >
        {item.name}
      </Paragraph>;
    }
    return (
      <Text key={`text-${index}`}>
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
  pathArray: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BreadCrumbs;
