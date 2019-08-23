import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Table, Paragraph } from 'evergreen-ui';
import Loader from '../Loader';

class Header extends React.Component {
  headerRowCell = (cell, index) => {
    const { basis } = this.props;

    const flexProps = {};
    if (index === 0 && basis) {
      flexProps.flexBasis = basis;
      flexProps.flexShrink = 0;
      flexProps.flexGrow = 0;
    }
    return (
      <Table.TextHeaderCell
        key={cell}
        {...flexProps}
      >
        {cell}
      </Table.TextHeaderCell>
    );
  };


  getHeader = () => {
    const { cells, selected } = this.props;

    const header = [];

    if (selected) {
      header.push(this.headerRowCell(cells[0], 0));
    } else {
      cells.forEach((cell, index) => {
        header.push(this.headerRowCell(cell, index));
      });
    }

    return (<Table.Head>{header}</Table.Head>);
  }

  render() {
    const { loading } = this.props;
    
    return loading ? <Loader /> : this.getHeader();
  }
}

Header.defaultProps = {
  loading: false,
  rows: []
};

Header.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  basis: PropTypes.number
};

export default Header;
