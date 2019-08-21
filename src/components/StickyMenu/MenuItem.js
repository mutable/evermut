import React from 'react';
import { Menu, Icon, Text } from 'evergreen-ui';

const MutMenuItem = ({ children, icon, props }) => {
  const prop = props && Object.keys(props) && Object.keys(props).length ? props : null;
  const pr = icon ? (<Icon size={24} color="#ffffff" icon={icon} />) : null;

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
      transition='background-color .12s ease'
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

export default MutMenuItem;