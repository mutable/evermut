import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from "@storybook/addon-knobs";

import Loader from '../components/Loader';

storiesOf("Loader", module)
.addParameters({ jest: ['loader.test'] })
.add("default", () => (<Loader />))
.add("with height", () => {
  const height = text('height', '100px');

  return (<Loader height={height} />);
})