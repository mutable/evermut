import React from 'react';
import { Menu, Icon, Text } from 'evergreen-ui';

class MutMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
      active: props.active
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps, prevState);
    return null;
  }

  render() {
    const { hovered, active } = this.state;
    const { children, icon, props, changeSelectedColor, selectedColor } = this.props;
    const prop = props && Object.keys(props) && Object.keys(props).length ? props : null;
    const pr = icon ? (<Icon size={24} color="#ffffff" icon={icon} />) : null;
    let backgroundColor = 'transparent';
    if(hovered) backgroundColor = selectedColor;
    // if(hovered || active) backgroundColor = selectedColor;

    return (
      <Menu.Item
        is="a"
        height="auto"
        justifyContent="center"
        alignContent="center"
        paddingBottom='10px'
        marginTop='2px'
        marginBottom='2px'
        textDecoration='none'
        textAlign='center'
        style={{ backgroundColor }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        onSelect={() => changeSelectedColor(children)}
        {...prop}
      >
        <Text
          fontSize={12}
          color="#ffffff"
          flexDirection='column'
          display='flex'
          alignItems='center'
        >
          {pr}{children || null}
        </Text>
      </Menu.Item>
    );
  }
}

export default MutMenuItem;