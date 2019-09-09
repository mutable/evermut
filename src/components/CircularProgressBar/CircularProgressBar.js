import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading, TextInputField, Button } from 'evergreen-ui';

class CircularProgressBar extends React.Component {  
  render() {
  	const { size, strokeWidth, strokeColor, percentage } = this.props;
    const radius = (size - strokeWidth) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;

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
          className="circle-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          fill='none'
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} />
        	<text
            className="circle-text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${percentage}%`}
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
