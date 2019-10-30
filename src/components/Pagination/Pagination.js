import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Button, IconButton, Text } from 'evergreen-ui';
import Loader from '../Loader';

const DISTANCE = 10;
const MARGIN = 15;
const HEIGHT = 25;
const COLOR = '#425a70';
const FONT = 11;

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: props.pageIndex,
      pageLimit: props.limit,
      countOfPages: Math.ceil(props.count / props.limit),
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
      paddingLeft={DISTANCE}
      paddingRight={DISTANCE}
      marginLeft={DISTANCE/2}
      marginRight={DISTANCE/2}
      height={HEIGHT}
      fontSize={FONT}
      color={COLOR}
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
      <Pane display='inline-flex' marginRight={MARGIN}>
        <IconButton appearance="minimal" height={HEIGHT} disabled={backActive} onClick={() => this.clicked(prevPage)} icon="chevron-left" />
        <Pane>
        	{countOfPages <= 4 && _pages.map(page => this.pageButton(page))}
        	{countOfPages > 4 &&
        		<Pane>
	        		{this.isIncluded(_pages, 1) && this.pageButton(1)}
		        	<Text fontSize={FONT} color={COLOR}>{front}</Text>
		        	 {
		        		_pages.map(page => this.pageButton(page))
							 }
		        	<Text fontSize={FONT} color={COLOR}>{back}</Text>
					    {this.isIncluded(_pages, countOfPages) && this.pageButton(countOfPages)}
		        </Pane>
	        }
        </Pane>
        <IconButton appearance="minimal" height={HEIGHT} fontSize={FONT} disabled={nextActive} onClick={() => this.clicked(nextPage)} icon="chevron-right" />
      </Pane>
    );
  }
}

Pagination.defaultProps = {
  limit: 10,
  pageIndex: 1,
  loading: false
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  limit: PropTypes.number,
  pageIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired
}

export default Pagination;