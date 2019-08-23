import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Table, Paragraph } from 'evergreen-ui';
import Loader from '../Loader';
import Head from './Head';

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
    const { selected } = this.state;
    const { singleComponent, loading } = this.props;
    let  props = {
      flex: '1 0 0',
      margin: 16
    };

    const singleComponentProps = {
      ...singleComponent.props,
      details: selected
    }

    return (<Pane {...props} key={rowIndex}>
      {!loading ? React.createElement(singleComponent.type, singleComponentProps) : <Loader />}
    </Pane>)
  }

  rowCells = (row, index) => {
    const { basis } = this.props;
    return Object.keys(row).map((key, cellIndex) => {
        const flexProps = {};
        if (cellIndex === 0) {
          flexProps.flexBasis = basis;
          flexProps.flexShrink = 0;
          flexProps.flexGrow = 0;
        }

        ++index;
        return (
          key !== 'menu' && (<Table.TextCell key={`${key}-${cellIndex}`} {...flexProps}>
           {row[key]}
          </Table.TextCell>)
        )
      }
    )
  };

  oneRowCell = (row) => {
    const { basis, listItem, ...others } = this.props;

    const listItemProps = {
      ...others,
      details: row
    }

    return (
      <Table.TextCell flexBasis={basis} flexShrink={0} flexGrow={0}>
        {React.createElement(listItem, listItemProps)}
      </Table.TextCell>
    );
  };

  getTable = () => {
    const { rows, basis, loading } = this.props;
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

    const headCells = rows.length ? Object.keys(rows[0]).filter(item => item !== 'menu') : [];
    const table = [
      (<Table
        key="expanded-table"
        width={selected ? basis : 'auto'}
      >
        <Head
          cells={headCells}
          selected={selected}
          basis={basis}
          loading={loading}
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
  basis: 300, 
  loading: false
};

TableWithSingle.propTypes = {
  basis: PropTypes.number,
  loading: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  listItem: PropTypes.elementType.isRequired,
  singleComponent: PropTypes.shape({
    type: PropTypes.elementType.isRequired,
    props: PropTypes.object
  }).isRequired
};

export default TableWithSingle;
