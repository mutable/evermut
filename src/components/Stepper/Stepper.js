import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Button, IconButton, Popover, Menu, Table } from 'evergreen-ui';
import Loader from '../Loader';
import CircularProgressBar from '../CircularProgressBar'

class Stepper extends React.Component {
	constructor() {
		super();

		this.state = {
			index: 0,
			prevIndexes: [0],
			popoverOpened: false
		}
	}
	showList() {
		const { index, prevIndexes } = this.state;
		const { steps } = this.props;

		return (
			<Pane>
			  {steps && steps.length && steps.map((item, _index) => {
      		if (_index + 1 !== steps.length) {
      			return (
					  	<Table.Row
					  		key={`step-shown-menu-${_index}`}
					  		isSelectable={prevIndexes.includes(_index) && (index < steps.length-1)}
					  		isSelected={_index === index}
					  		onSelect={() => this.menuAction(_index)}
					  		borderBottom='default' height="auto" paddingY={12}
					  	>
				        <Table.TextCell>
				          {item.link.name}
				        </Table.TextCell>
						  </Table.Row>
					  );
					} else return null;
      	})}			    
			</Pane>
		);
	}

	onClickNext(e, isNext) {
		const { index, prevIndexes } = this.state;
		const { steps } = this.props;

		let _index = index;
		if(index + 1 !== steps.length) {
			_index = isNext ? index + 1 : index - 1;
		} else {
			_index = !isNext ? index - 1 : index;
		}

		const _prevIndexes = prevIndexes;
		if(isNext) {
			if (!prevIndexes.includes(_index)) {
				_prevIndexes.push(_index);
			}
		}

		this.setState({ index: _index, prevIndexes: _prevIndexes });

		if (steps[index].func) steps[index].func(e);
	}

	menuAction(i) {
		const { index } = this.state;
		const { steps } = this.props;

		let _index = i;
		if (index >= steps.length-1) _index = index;
		this.setState({ index: _index, popoverOpened: false });
	}

	openPopover() {
		const { popoverOpened } = this.state;
		this.setState({ popoverOpened: !popoverOpened });
	}

	getStepMenu() {
		const { popoverOpened } = this.state;
		const { steps } = this.props;

		return (
			<Popover
			  position='bottom-left'
			  isShown={popoverOpened}
			  onOpen={() => this.openPopover()}
			  shouldCloseOnExternalClick
			  content={
			    <Menu>
			      <Menu.Group>
			      	{steps && steps.length && steps.map((item, index) => {
			      		if (index + 1 !== steps.length) {
				      		return (
						        <Menu.Item
						        	key={`step-menu-${index}`}
						          onSelect={() => this.menuAction(index)}
						        >
						         {item.link.name}
						        </Menu.Item>
						      );
				      	} else return null;
			      	})}
			      </Menu.Group>
			    </Menu>
			  }
			>
				<IconButton appearance="minimal" icon="caret-down" iconSize={16} />
			</Popover>
		);
	}

	displayContent = () => {
		const { index } = this.state;
		const { steps, show } = this.props;
		let nextButtonText = 'Next';
		if(index + 2 === steps.length) {
			nextButtonText = 'Finish';
		} else if (index + 1 === steps.length) nextButtonText = '';

		return (
			<Pane border="default" width="100%">
				<Pane display='flex' alignItems='center' width='100%' backgroundColor='#F5F6F7' padding={8} borderBottom='default'>
					<CircularProgressBar 
	          size={50}
	          strokeWidth={5}
	          strokeColor='#525F7F'
	          secondaryStrokeColor='#99a5c2'
	          // percentage
	          step={{current: index+1, count: steps.length-1 }}
	        />
					<Text textAlign='end' marginLeft={16}>
						<Text color='black' display='block'>{steps[index].link && steps[index].link.name}</Text>
						{(index + 2 <= steps.length) && <Text color='black'>Next: {steps[index+1].link && steps[index+1].link.name}</Text> || null}
					</Text>
					{!show && this.getStepMenu() || null}
				</Pane>
				<Pane marginTop={8} margin={8} height={300}>
					{steps[index].component}
				</Pane>
				{nextButtonText && (
					<Pane padding={8} display='flex' backgroundColor='#F5F6F7' borderTop='default' justifyContent='space-between'>
						<Button onClick={(e) => this.onClickNext(e)} disabled={index === 0}>Back</Button>
						 <Button onClick={(e) => this.onClickNext(e, true)}>{nextButtonText}</Button>
					</Pane>
				)}
			</Pane>
		);
	}

  render() {
    const { show, loading, steps, func } = this.props;
    return ( loading ? <Loader /> :
      <Pane display='flex'>
        {show && <Pane width="auto" backgroundColor='#F5F6F7' borderTop="default" borderBottom="default" borderLeft="default">{this.showList()}</Pane> || null}
        {steps && steps.length && this.displayContent()}
      </Pane>
    )
  }
}

Stepper.defaultProps = {
  loading: false,
  show: false
}

Stepper.propTypes = {
  loading: PropTypes.bool,
  show: PropTypes.bool,
  steps: PropTypes.arrayOf(PropTypes.shape({
  	link: PropTypes.object,
  	component: PropTypes.element,
  	func: PropTypes.func
  })).isRequired,
  func: PropTypes.func.isRequired
};

export default Stepper;
