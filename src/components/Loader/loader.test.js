import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '../Loader';

describe('<Loader />', () => {
  it('component render correctly', () => {
    const component = renderer.create(<Loader />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with the changed height of wrapper', () => {
    const loader = renderer.create(<Loader height="100px" />);
    const tree = loader.toJSON();
    expect(tree).toMatchSnapshot();
  });
});