import React from 'react';
import { Pane, Text, IconButton, Table } from 'evergreen-ui'
import Loader from '../Loader';
import Pagination from '../Pagination';

const DISTANCE = 15;
const FONT_SIZE = 10;

class TableComponent extends React.Component {
  render() {
    const { list, loading, headerNames, search, pagination, onClick } = this.props;

    return (
      <Pane position='relative'>
        <Table>
          <Table.Head backgroundColor='white' marginTop={DISTANCE} paddingBottom={DISTANCE}>
            {search && <Table.SearchHeaderCell onChange={search} />}
            {headerNames && headerNames.length && headerNames.map((item, index) => 
              <Table.TextHeaderCell paddingLeft={DISTANCE/2}>
                <Text display="flex" alignItems='center' fontWeight="bold">
                  {item.name || '-'}
                  {item.icon && <IconButton appearance="minimal" icon={item.icon} onClick={() => item.func(item)}/>}
                </Text>
                <Text display='block' fontSize={FONT_SIZE}>
                  {item.helper || ''}
                </Text>
              </Table.TextHeaderCell>
            )}
          </Table.Head>
          <Table.Body>
            {loading && <Loader /> ||
              list.map((item, index) => {
                const clonedItem = Object.assign({}, item);

                delete clonedItem.id;
                const keys = Object.keys(clonedItem);
                return (
                  <Table.Row key={`collab-${index}`}
                    alignItems='center' paddingTop={DISTANCE} paddingBottom={DISTANCE}
                    isSelectable onSelect={() => onClick(item)}
                  >
                    {keys && keys.length && keys.map((key, index) =>
                      <Table.TextCell>{item[key] || '-'}</Table.TextCell>
                    )}
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
        <Pane position='absolute' right={0} paddingTop={DISTANCE} paddingBottom={DISTANCE}>
          <Pagination
            count={pagination.count}
            pageIndex={pagination.pageIndex}
            onClick={index => pagination.onClick(index)}
            limit={pagination.limit}
          />
        </Pane>
      </Pane>
    );
  }
}

TableComponent.defaultProps = {
  loading: false
}

TableComponent.propTypes = {
  loading: PropTypes.bool,
  headerNames: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TableComponent;
