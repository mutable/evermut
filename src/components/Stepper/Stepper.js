import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Button } from 'evergreen-ui';
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

	displayContent = () => {
		const { index } = this.state;
		const { steps } = this.props;
		return (
			<Pane>
				<Pane>
					<Text>{index + 1}/{steps.length}</Text>
					<Text>
						<Text>{steps[index].link && steps[index].link.name}</Text>
						{(index + 1 !== steps.length) && <Text>Next: {steps[index+1].link && steps[index+1].link.name}</Text> || null}
					</Text>
				</Pane>
				<Pane>
					{steps[index].component}
				</Pane>
				<Pane>
					<Button onClick={() => this.onClickNext()} disabled={index === 0}>Back</Button>
					<Button onClick={() => this.onClickNext(true)}>{(index + 1 !== steps.length) ? 'Next' : 'Finish'}</Button>
				</Pane>
			</Pane>
		);
	}

  render() {
    const { show, loading, steps, func } = this.props;

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
