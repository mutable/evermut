import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Table } from 'evergreen-ui';
import Loader from '../Loader';
import Pagination from '../Pagination';

class TableComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerKeys: props.header ? Object.keys(props.header) : []
    }
  }
  onSelect(item) {
    const { onClick } = this.props;
    if(onClick) {
      onClick(item);
    }
  }
  getTable = () => {
    const { headerKeys } = this.state;
    const { header, body, onClick} = this.props;

    return (
      <Table width='100%'>
        <Table.Head>
          {headerKeys && headerKeys.length && headerKeys.map((item, index) => {
            return (
              <Table.TextHeaderCell key={`table-header-${index}`}>
                {header[item]}
              </Table.TextHeaderCell>
            );
          })}
        </Table.Head>
        <Table.Body>
          {body.map((item, index) => (
            <Table.Row key={`body-${index}`} isSelectable={!!onClick} onSelect={() => this.onSelect(item)}>
              {headerKeys.map((key, keyIndex) => (
                <Table.TextCell key={`cell-${keyIndex}`}>{item[key]}</Table.TextCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  getFooter = () => {
    const footer = {
      background: '#F5F6F7',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      paddingBottom: 6
    }

    const { totalCount, offset, limit, click} = this.props.pagination;

    return (
      <Pane {...footer}>
        <Pagination
          count={totalCount}
          pageLimit={limit}
          currentPage={offset}
          onClick={click}
        />
      </Pane>
    );
  }

  render() {
    const { loading, pagination } = this.props;

    const props = {
      width: '100%',
      paddingRight: 0,
      paddingLeft: 0
    };

    return (
      <Pane {...props}>
        {loading ? <Loader /> : this.getTable()}
        {pagination ? this.getFooter() : null}
      </Pane>
    )
  }
}

TableComponent.defaultProps = {
  loading: false
}

TableComponent.propTypes = {
  loading: PropTypes.bool,
  header: PropTypes.object.isRequired,
  body: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default TableComponent;
