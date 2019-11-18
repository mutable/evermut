import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

import Pagination from '../components/Pagination';

storiesOf("Pagination", module)
.addParameters({ jest: ['pagination.test'] })
.add("default", () => {
  const count = number('count of items (required)', 35);

  return (
    <Pagination
      loading={false}
      count={count}
      onClick={action('pagination clicked')}
    />
  )
})
.add("with custom limit and page number", () => {
  const count = number('count of items (required)', 100);
  const limit = number('limit of rows', 10);
  const pageIndex = number('current page', 1);

  return (
    <Pagination
      loading={false}
      count={count}
      limit={limit}
      pageIndex={pageIndex}
      onClick={action('pagination clicked')}
    />
  )
})