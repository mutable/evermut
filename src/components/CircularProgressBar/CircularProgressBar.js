import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text } from 'evergreen-ui';

class CircularProgressBar extends React.Component {  
  render() {
  	const { size, strokeWidth, strokeColor, secondaryStrokeColor, percentage, step } = this.props;
    const radius = (size - strokeWidth) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const lengthOfCirle = radius * Math.PI * 2;
    
    const percent = step && Math.floor((step.current-1)/step.count * 100);
    let offset = lengthOfCirle - lengthOfCirle * percent / 100;

    const percentNew = step && Math.floor((step.current)/step.count * 100);
    const offsetNew = lengthOfCirle - lengthOfCirle * percentNew / 100;

  	const text = (percentage && step) ? ( percentNew + '%') : `${step.current}/${step.count}`;
    
    return (
    	<Pane position='relative' display='flex' alignItems='center' justifyContent='center'>
	  		<svg
	        width={size}
	        height={size}
	        viewBox={viewBox}
	      >
	        <circle
		        className="circle-background"
		        cx={size / 2}
		        cy={size / 2}
		        r={radius}
		        stroke='#ddd'
		        fill='none'
		        strokeWidth={`${strokeWidth}px`} />
	        <circle
	          className="circle-advance-progress"
	          cx={size / 2}
	          cy={size / 2}
	          r={radius}
	          stroke={secondaryStrokeColor}
		        transform={`rotate(-90 ${size / 2} ${size / 2})`}
	          fill='none'
	          style={{
	            strokeDasharray: lengthOfCirle,
	            strokeDashoffset: offsetNew
	          }}
	          strokeWidth={`${strokeWidth}px`} />
	         <circle
		        className="circle-progress"
		        cx={size / 2}
		        cy={size / 2}
		        r={radius}
		        stroke={strokeColor}
		        fill='none'
		        strokeWidth={`${strokeWidth}px`}
		        transform={`rotate(-90 ${size / 2} ${size / 2})`}
		        style={{
		          strokeDasharray: lengthOfCirle,
		          strokeDashoffset: offset }} />
	      </svg>
	      <Text position='absolute'>{offset === 0 ? "Done" : text}</Text>
	    </Pane>
    );
  }
}

CircularProgressBar.defaultProps = {
  strokeColor: 'black',
  percentage: false
}

CircularProgressBar.propTypes = {
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  secondaryStrokeColor: PropTypes.string.isRequired,
  percentage: PropTypes.bool,
  step: PropTypes.shape({
  	current: PropTypes.number.isRequired,
  	count: PropTypes.number.isRequired
  }).isRequired
};

export default CircularProgressBar;
     