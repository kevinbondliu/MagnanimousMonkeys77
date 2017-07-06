import React from 'react';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';

 class ThumbVisualization extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {}
	  }

	 render() {
	 	return (
		  <div className="col-xs-12 thumb-visualization text-center">
        <i style={{transform: `rotate(${(45 * this.props.thumbValue) - 180}deg)`, transition: "300ms ease all"}} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
        <BarChart width="100" height="50"/>
        <PieChart />
		  </div>
	  );
	 }

 }

 export default ThumbVisualization;
