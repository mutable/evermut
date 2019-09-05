import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Button, IconButton, Popover, Menu } from 'evergreen-ui';
import Loader from '../Loader';

class Stepper extends React.Component {
	constructor() {
		super();

		this.state = {
			index: 0
		}
	}
	showList() {
		return (<Text>asd</Text>);
	}

	onClickNext(isNext) {
		const { index } = this.state;
		const { steps } = this.props;

		let _index = index;
		if(index + 1 !== steps.length) {
			_index = isNext ? index + 1 : index - 1;
		} else {
			_index = !isNext ? index - 1 : index;
		}
		this.setState({ index: _index })
	}

	getStepMenu() {
		const { steps } = this.props;

		return (
			<Popover
			  position='bottom-left'
			  content={
			    <Menu>
			      <Menu.Group>
			      	{steps && steps.length && steps.map((item, index) => {
			      		return (
					        <Menu.Item
					        	key={`step-menu-${index}`}
					          onSelect={() => toaster.notify('Share')}
					        >
					          {item.link.name}
					        </Menu.Item>
					      );
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
		return (
			<Pane border="default">
				<Pane display='flex' alignItems='center' width='100%' backgroundColor='#F5F6F7' padding={8} borderBottom='1px solid #E4E7EB'>
					<Text width='10%' color='black'>{index + 1}/{steps.length}</Text>
					<Text textAlign='end'>
						<Text color='black' display='block'>{steps[index].link && steps[index].link.name}</Text>
						{(index + 1 !== steps.length) && <Text color='black'>Next: {steps[index+1].link && steps[index+1].link.name}</Text> || null}
					</Text>
					{!show && this.getStepMenu() || null}
				</Pane>
				<Pane marginTop={8} margin={8}>
					{steps[index].component}
				</Pane>
				<Pane padding={8} display='flex' backgroundColor='#F5F6F7' borderTop='1px solid #E4E7EB' justifyContent='space-between'>
					<Button onClick={() => this.onClickNext()} disabled={index === 0}>Back</Button>
					<Button onClick={() => this.onClickNext(true)}>{(index + 1 !== steps.length) ? 'Next' : 'Finish'}</Button>
				</Pane>
			</Pane>
		);
	}

  render() {
    const { show, loading, steps, func } = this.props;
    // const paneStyle = {
    // 	border: '1px solid black',
    // 	padding: '8px',
    // }
    return ( loading ? <Loader /> :
      <Pane>
        {show && <Pane>{this.showList()}</Pane> || null}
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
