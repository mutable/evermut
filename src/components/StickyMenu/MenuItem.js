import React from 'react';
import { Menu, Icon, Text } from 'evergreen-ui';

class MutMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    }
  }

  render() {
    const { hovered } = this.state;
    const { children, active, icon, props, changeSelectedColor, selectedColor } = this.props;
    const prop = props && Object.keys(props) && Object.keys(props).length ? props : null;
    const pr = icon ? (<Icon size={24} color="#ffffff" icon={icon} />) : null;
    let backgroundColor = 'transparent';
    let shadow = false;

    if(hovered || active) backgroundColor = selectedColor;
    
    if(active) shadow = true;

    const style = { backgroundColor };

    if (shadow) {
      style.boxShadow = "inset 0px 0px 2px 0px rgba(0,0,0,0.15)";
    }

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
        style={style}
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
          lineHeight={1.2}
          alignItems='center'
        >
          {pr}{children || null}
        </Text>
      </Menu.Item>
    );
  }
}

export default MutMenuItem;