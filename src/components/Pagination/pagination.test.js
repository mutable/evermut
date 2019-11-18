import React from 'react';
import renderer from 'react-test-renderer';

import Pagination from '../Pagination';

describe('<Pagination />', () => {
  it('component with min requirements render correctly', () => {
    const component = renderer.create(<Pagination
      loading={false}
      count={30}
      onClick={jest.fn()}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component advanced render correctly', () => {
    const component = renderer.create(
      <Pagination
        loading={false}
        count={300}
        limit={25}
        pageIndex={3}
        onClick={jest.fn()}
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});