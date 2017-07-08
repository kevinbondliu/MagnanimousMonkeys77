import React from 'react';
// import BarChart from './BarChart.jsx';
// import PieChart from './PieChart.jsx';
// import { Tabs, Tab } from 'react-bootstrap';


class ThumbVisualizationStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // getInitialState() {
    //     return {
    //         key: 1
    //     };
    // }

    // handleSelect(key) {
    //     this.setState({ key });
    // }

    render() {
        return (
          <div className="col-xs-12 thumb-visualization text-center">
          <i style={{transform: `rotate(${(45 * this.props.thumbValue) - 180}deg)`, transition: "300ms ease all"}} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
          </div>
        )
    }
}

export default ThumbVisualizationStudent;