import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Paragraph, Select, Combobox } from 'evergreen-ui';

class BreadCrumbs extends React.Component {
  handleClick(event, list, index) {
    const { onClick } = this.props;
    const selected = list.crumb.filter(it => it.id === event.target.value)[0];
    if(onClick) onClick({ crumb: list.crumb, route: selected }, index);
  }

  handleClickCombo(selected, list, index) {
    const { onClick } = this.props;

    if(onClick && selected !== null) onClick({ crumb: list.crumb, route: selected }, index);
  }

  getAppearance(cr, index) {
    const { loading } = this.props;

    let text = '';

    if(typeof cr.crumb !== 'string') {
      text = (
        <Combobox
          initialSelectedItem={cr.route}
          selectedItem={cr.route || null}
          items={cr.crumb}
          isLoading={loading}
          itemToString={item => item ? item.name : ''}
          onChange={selected => this.handleClickCombo(selected, cr, index)}
        />
      );
    } else {
      text = <Paragraph
        is='a'
        textDecoration={cr.route ? 'underline' : 'none'}
        cursor={cr.route ? 'pointer' : 'default'}
        disabled={!cr.route}
        onClick={() => this.props.onClick(cr, index)}
      >{cr.crumb}</Paragraph>;
    }

    return (
      <Text
        lineHeight={2}
        key={`breadcrumb-path-${index}`}
      >
        {text}
      </Text>
    );
  }

  render() {
    const { crumbs } = this.props;

    return (
      <Pane display="flex" flexDirection="row">
        {crumbs && crumbs.length && crumbs.map((item, index) => {
          return (<React.Fragment key={`breadcrumb-${index}`} >
            {this.getAppearance(item, index)}
            {
              !(index === crumbs.length - 1) ? (
                <Text
                width="10px"
                textAlign="center"
                lineHeight={2}
                key={`breadcrumb-slash-${index}`}
              >/</Text>
              ) : ''
            }
          </React.Fragment>)
        })}
      </Pane>
    );
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
