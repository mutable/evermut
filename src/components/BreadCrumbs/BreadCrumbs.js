import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Paragraph, Select } from 'evergreen-ui';
import Loader from '../Loader';

class BreadCrumbs extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: false
    }
  }
  handleClick(event, list) {
    const { onClick } = this.props;
    if(onClick) onClick({selected: event.target.value, list});

    this.setState({ selected: event.target.value});
  }
  getAppearance(item, last, index) {
    const { selected } = this.state;
    let text = '';

    if(typeof item.crumb !== 'string') {
      text = (
        <Select
          value={selected}
          onChange={(e) => this.handleClick(e, item.crumb)}
        >
          {
            item.crumb.length && item.crumb.map((value, i) => {
              return <option value={value.id} key={`options-${i}`}>{value.name}</option>
            })
          }
        </Select>
      );
    } else {
      text = <Paragraph
        is='a'
        textDecoration={item.route ? 'underline' : 'none'}
        cursor={'pointer'}
        onClick={() => this.props.onClick(item)}
      >
        {item.crumb}
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
    const { crumbs, loading } = this.props;

    return ( loading ? <Loader /> :
      <Pane>
        {crumbs && crumbs.length && crumbs.map((item, index) => {
          return this.getAppearance(item, index === crumbs.length - 1, index);
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
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    crumb: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }))]).isRequired,
    route: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })])
  })).isRequired,
  onClick: PropTypes.func.isRequired
};

export default BreadCrumbs;
