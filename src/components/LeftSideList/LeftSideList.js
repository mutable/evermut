import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import Loader from '../Loader';
import BackButton from '../BackButton';

const LEFT_SIDE_ITEM_WIDTH = 270;
const HEIGHT = '100%';
const BACK_BUTTON_HEIGHT = 55;
const MARGIN = 15;
const PADDING = 15;

const COLORS = {
  DEFAULT: 'white',
  SELECTED: '#f5f6f7'
}

class LeftSideList extends React.Component {
  state = {
    loading: true,
    hovered: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.loading && !nextProps.loading) return { loading: false }
    return null;
  }

  selectItem(id) {
    if (this.props.selectItem) {
      this.props.selectItem(id);
    }
  }

  _backTo = () => {
    if (this.props.backButtonClick) this.props.backButtonClick();
  }

  render() {
    const { loading, hovered } = this.state;
    const {
      list,
      containerStyle,
      itemStyle,
      selected,
      selectedColor,
      defaultBackground,
      header,
      body,
      footer,
      backButtonStyle,
      backButtonName
    } = this.props;

    return (
    	<Pane
        width={LEFT_SIDE_ITEM_WIDTH}
        height={HEIGHT}
        display="flex"
        flexDirection="column"
        overflowX="hidden"
        overflowY="auto"
        border="none"
        {...containerStyle}
      >
        {(backButtonName && <Pane
            elevation={0}
            backgroundColor={defaultBackground}
            height={BACK_BUTTON_HEIGHT}
            lineHeight={3.4}
            paddingLeft={PADDING*2}
            borderBottom='default'
          >
            <BackButton goBack={() => this._backTo()} name={backButtonName} {...backButtonStyle} />
          </Pane>) || null
        }
        {
          (loading && !list.length && <Loader />) ||
          (list.length && list.map((item, index) =>
            (<Pane
              key={`left-list-menu-${item.id.toString()}-${index.toString()}`}
              cursor="pointer"
              onMouseEnter={() => this.setState({ hovered: item.id })}
              onMouseLeave={() => this.setState({ hovered: false })}
              onClick={() => this.selectItem(item.id)}
              borderBottom='default'
              padding={PADDING}
              backgroundColor={((item.id === selected) || (hovered === item.id)) ? selectedColor : defaultBackground }
              {...itemStyle}
            >
              {(header && header(item)) || null}
              {(body && body(item)) || null}
              {(footer && footer(item)) || null}
            </Pane>)
          )) || null
        }
      </Pane>
    );
  }
}

LeftSideList.defaultProps = {
  loading: false,
  defaultBackground: COLORS.DEFAULT,
  selectedColor: COLORS.SELECTED,
  header: null,
  footer: null,
  backButtonName: ''
}

LeftSideList.propTypes = {
  list: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  loading: PropTypes.bool,
  header: PropTypes.func,
  body: PropTypes.func,
  footer: PropTypes.func,
  selectItem: PropTypes.func.isRequired,
  backButtonName: PropTypes.string,
  backButtonClick: PropTypes.func,
  containerStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  backButtonStyle: PropTypes.object,
  selectedColor: PropTypes.string,
  defaultBackground: PropTypes.string
}

export default LeftSideList;
