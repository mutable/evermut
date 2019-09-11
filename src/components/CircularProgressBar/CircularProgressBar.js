import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'evergreen-ui';

class CircularProgressBar extends React.Component {  
  render() {
  	const { size, strokeWidth, strokeColor, secondaryStrokeColor, percentage, step } = this.props;
  	const text = step ? `${step.current}/${step.count}` : `${percentage}%`;
    const radius = (size - strokeWidth) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const lengthOfCirle = radius * Math.PI * 2;
    
    const percent = step ? Math.floor((step.current-1)/step.count * 100) : percentage;
    let offset = lengthOfCirle - lengthOfCirle * percent / 100;

    const percentNew = step ? Math.floor((step.current)/step.count * 100) : percentage;
    const offsetNew = lengthOfCirle - lengthOfCirle * percentNew / 100;
    
    return (
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
      	<text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          {offset === 0 ? "Done" : text}
        </text>
      </svg>
    );
  }
}

CircularProgressBar.defaultProps = {
  strokeColor: 'black'
}

CircularProgressBar.propTypes = {
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired
};

export default CircularProgressBar;
     