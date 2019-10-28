import React from 'react';
import { Pane, Button, IconButton, Text } from 'evergreen-ui';
import PropTypes from 'prop-types';
import Loader from '../Loader';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

		const pageLimit = props.limit || PAGE_LIMIT
		const pageIndex = props.pageIndex || DEFAULT_PAGE
    const countOfPages = Math.ceil(props.count / pageLimit);

    this.state = {
      pageIndex,
      pageLimit,
      countOfPages,
      count: props.count,
      pages: [],
      front: '',
      back: '...',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.count !== nextProps.count) {
      return { countOfPages: Math.ceil(nextProps.count / prevState.pageLimit), count: nextProps.count };
    }
    return null;
  }

  clicked(index) {
    const { pageLimit, pageIndex } = this.state;

    if (this.props.onClick) this.props.onClick(index, pageLimit);
    this._getEllipses(index);
    this.setState({ pageIndex: index });
  }

  clickedDouble(isNext) {
  	const { countOfPages, pageLimit } = this.state;
  	const pageIndex = isNext ? countOfPages : 1;
    if (this.props.onClick) this.props.onClick(pageIndex, pageLimit);
  	this.setState({ pageIndex });
  }

  _getEllipses(index) {
  	const { countOfPages } = this.state;
  	let front = '...'
  	let back = '...'
  	if(index >= 1 && index <= countOfPages) {
  		if((index - 1) <= 2) {
  			front = ''
  		}
  		if(countOfPages - (index + 1) <= 1) {
  			back = ''
  		}
  	}
  	this.setState({ front, back });
  }

  _getPages(index) {
  	const { countOfPages, pageIndex, count } = this.state;
  	const pages = [];
    
    if(count === 0) {
        pages.push(1);
    } else if (countOfPages <= 4) {
  		for (let i = 1; i <= countOfPages; i++) {
  			pages.push(i);
  		}
  	} else {
		 	if ((index + 1) > countOfPages) {
	  		pages.push(index - 2, index - 1, index);
	  	} else if ((index - 1) < 1) {
	  		pages.push(index, index + 1, index + 2);
	  	} else {
	  		pages.push(index - 1, index, index + 1);
	  	}
  	}
		return pages;
  }

  pageButton(number) {
    const  { countOfPages, pageIndex } = this.state;
    return <Button
      disabled={countOfPages < 2}
      fontWeight={pageIndex === number ? "bold" : 'normal'}
      background={pageIndex === number ? "#edf0f2" : 'white'}
      appearance="minimal"
      onClick={() => this.clicked(number)}
      paddingLeft={10} paddingRight={10} marginLeft={5} marginRight={5} height={25}
      fontSize={11} color='#425a70'
    >
      {number}
    </Button>
  }

	isIncluded(array, n){
		const { pages, countOfPages } = this.state;

		const item = array.findIndex(i => (i === n))

		if (item !== -1 ) return false;
		return true;
	}

  render() {
    const { pageIndex, pageLimit, countOfPages, pages, front, back } = this.state;
    const { count, classes, translate, loading } = this.props;

    const backActive = (pageIndex <= 1);
    const nextActive = (pageIndex >= countOfPages);
    const nextPage = pageIndex + 1;
    const prevPage = pageIndex - 1;

    const _pages = this._getPages(pageIndex);

    return ( loading ? <Loader /> : 
      <Pane display='inline-flex' marginRight={15}>
        <IconButton appearance="minimal" height={25} disabled={backActive} onClick={() => this.clicked(prevPage)} icon="chevron-left" />
        <Pane>
        	{countOfPages <= 4 && _pages.map(page => this.pageButton(page))}
        	{countOfPages > 4 &&
        		<Pane>
	        		{this.isIncluded(_pages, 1) && this.pageButton(1)}
		        	<Text fontSize={11} color='#425a70'>{front}</Text>
		        	 {
		        		_pages.map(page => this.pageButton(page))
							 }
		        	<Text fontSize={11} color='#425a70'>{back}</Text>
					    {this.isIncluded(_pages, countOfPages) && this.pageButton(countOfPages)}
		        </Pane>
	        }
        </Pane>
        <IconButton appearance="minimal" height={25} fontSize={11} disabled={nextActive} onClick={() => this.clicked(nextPage)} icon="chevron-right" />
      </Pane>
    );
  }
}

Pagination.defaultProps = {
  limit: 10,
  pageIndex: 1
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  limit: PropTypes.number,
  pageIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired
}

export default Pagination;