import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Table, Paragraph } from 'evergreen-ui';
import Loader from '../Loader';
import Head from './Head';
import StateAction from '../StateAction'

class TableWithSingle extends React.Component {
  state = {
    selected: null,
    rowProps: {
      height: 'auto',
      paddingY: 12,
      overflow: 'hidden'
    },
    props: {
      flexFlow: 'row wrap',
      elevation: 0,
      backgroundColor: 'white'
    }
  };

  onSelect = (selected) => () => {
    this.setState(() => ({ selected }));

    if(this.props.selectItem) this.props.selectItem(selected);
  }

  selectedView = (rowIndex) => {
    let  props = {
      flex: '1 0 0',
      margin: 16
    };
    const { singleComponent, loading } = this.props;

    return (<Pane {...props} key={rowIndex}>
      {!loading ? singleComponent : <Loader />}
    </Pane>)
  }

  rowCells = (row, index) => {
    const { basis } = this.props;
    return Object.values(row).map((value, cellIndex) => {
        const flexProps = {};
        if (cellIndex === 0) {
          flexProps.flexBasis = basis;
          flexProps.flexShrink = 0;
          flexProps.flexGrow = 0;
        }

        ++index;
        return (
          <Table.TextCell key={`${value}-${index}`} {...flexProps}>
            {cellIndex === Object.values(row).length-1 ? <StateAction actions={value} /> : `${value}`}
          </Table.TextCell>
        )
      }
    )
  };

  oneRowCell = (row, index) => {
    const { basis, listItem, menu } = this.props;

    const Cell = listItem;

    ++index;
    return ( // @Anna
      <Table.TextCell flexBasis={basis} flexShrink={0} flexGrow={0}>
        <Cell
          key={`${row.company}-${index}`}
          details={row}
          menu={menu} // @Anna
        />
      </Table.TextCell>
    );
  };

  getTable = () => {
    const { rows, basis } = this.props;
    const { rowProps, selected } = this.state;
    
    const props = {};
    if (selected) {
      props.display = 'block';
      props.paddingY = 0;
    }

    const tableRows = [];
    let rowIndex = 0;
    rows.forEach(row => {
      ++rowIndex;
      tableRows.push(
        <Table.Row
          key={`${row.id}_${rowIndex}`}
          isSelectable
          {...props}
          {...rowProps}
          onSelect={this.onSelect(row)}
        >
          {selected ? this.oneRowCell(row, rowIndex) : this.rowCells(row, rowIndex)}
        </Table.Row>
      );
    });

    const headCells = rows.length ? Object.keys(rows[0]) : [];
    const table = [
      (<Table
        key="expanded-table"
        width={selected ? basis : 'auto'}
      >
        <Head
          cells={headCells}
          selected={selected}
          basis={basis}
        />
        <Table.Body maxHeight={360}>
          {tableRows}
        </Table.Body>
      </Table>)
    ];

    if (selected) table.push(this.selectedView(rowIndex));

    return table;
  }

  render() {
    const { loading } = this.props;
    const { props, selected } = this.state;
    const selectedProps = selected ? { display: 'flex' } : {};

    return (
      <Pane {...props} {...selectedProps}>
        { loading ? <Loader /> : this.getTable() }
      </Pane>
    );
  }
}

TableWithSingle.defaultProps = {
  // selected: null,
  rows: [],
  details: {},
  menu: {},
  basis: 300
};

TableWithSingle.propTypes = {
  basis: PropTypes.number,
  // selected: PropTypes.oneOfType([
  //   PropTypes.object
  // ]).isRequired,
  details: PropTypes.oneOfType([
    PropTypes.object
  ]).isRequired,
  menu: PropTypes.oneOfType([
    PropTypes.object
  ]).isRequired,
  rows: PropTypes.array.isRequired,
  listItem: PropTypes.elementType.isRequired,
  singleComponent: PropTypes.element.isRequired
};

export default TableWithSingle;
