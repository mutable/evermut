import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import logoDark from "../logo-dark.svg";
import Logo from "../src/components/Logo";

const style = {
  height: 30,
  marginBottom: 30
};
const img = (<Logo src={logoDark} style={style} />)
addDecorator(storyFn => <div>{img}<div>{storyFn()}</div></div>);


configure(require.context('../src/stories', true, /\.stories\.js$/), module);
