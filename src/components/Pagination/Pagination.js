import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Select, option, Button } from 'evergreen-ui';
import Loader from '../Loader';

const PAGE_LIMIT = 5;
const DEFAULT_PAGE = 1;

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: props.currentPage || DEFAULT_PAGE,
      pageLimit: props.pageLimit || PAGE_LIMIT
    };
  }

  handleChange = (event) => {
    const index = parseInt(event.target.value, 10);

    this.clicked(index);
  };

  _getPages = (countOfPages) => {
    const pages = [];
    if (countOfPages === 0) {
      pages[0] = 0;
    } else {
      for (let i = 1; i <= countOfPages; i++) {
        pages.push(i);
      }
    }

    return pages.map(page => (
      <option key={page}>
        { page }
      </option>
    ));
  }

  clicked(index) {
    const { pageLimit } = this.state;
    if (this.props.click) this.props.click(index, pageLimit);
    this.setState({ pageIndex: index });
  }

  render() {
    const { pageIndex, pageLimit } = this.state;
    const { count, classes, translate } = this.props;

    const countOfPages = Math.ceil(count / pageLimit);
    const pages = this._getPages(countOfPages);

    const backActive = (pageIndex <= 1);
    const nextActive = (pageIndex >= pages.length);
    const nextPage = pageIndex + 1;
    const prevPage = pageIndex - 1;

    return (
      <Pane>
        <Button
          disabled={backActive}
          onClick={() => this.clicked(prevPage)}
        >
          Back
        </Button>
        <Select
          value={pageIndex}
          onChange={e => this.handleChange(e)}
          disabled={countOfPages < 2}
        >
          {pages}
        </Select>
        <Button
          disabled={nextActive}
          onClick={() => this.clicked(nextPage)}
        >
          Next
        </Button>
      </Pane>
    );
  }
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired,
};

export default Pagination;
