import React from 'react';
import { Menu, Icon } from 'evergreen-ui';

const MutMenuItem = ({ children, icon, props }) => {
  const prop = props && Object.keys(props) && Object.keys(props).length ? props : null;
  const pr = icon ? (<Icon size={24} color="#ffffff" icon={icon} />) : null;

  return (
    <Menu.Item
      is="a"
      height="auto"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
      color="#ffffff"
      paddingBottom='10px'
      marginTop='2px'
      marginBottom='2px'
      textDecoration='none'
      textAlign='center'
      fontSize={12}
      transition='background-color .12s ease'
      {...prop}
    >{pr}{children || null}</Menu.Item>
  );
}

export default MutMenuItem;