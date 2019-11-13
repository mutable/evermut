import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

import Pagination from '../components/Pagination';

storiesOf("Pagination", module)
.addDecorator(withKnobs)
.add("with requirements", () => {
  const count = number('count of items (required)', 100);
  const limit = number('limit of rows (default)', 10);
  const pageIndex = number('current page (default)', 1);

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