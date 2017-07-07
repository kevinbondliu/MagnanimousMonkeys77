import React from 'react';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';
import { Tabs, Tab } from 'react-bootstrap';


class ThumbVisualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        //this.props.changeThumbVotes()
    }

    getInitialState() {
        return {
            key: 1
        };
    }

    handleSelect(key) {
        this.setState({ key });
    }

    render() {
        return (
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                <Tab eventKey={1} title="Tab 1">
                  <div className="col-xs-12 thumb-visualization text-center">
                    <i style={{ transform: `rotate(${(45 * this.props.thumbValue) - 180}deg)`, transition: "300ms ease all" }} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  </div>
                </Tab>
                <Tab eventKey={2} title="Tab 2">
                  <BarChart thumbVotes={this.props.thumbVotes} changeThumbVotes={this.props.changeThumbVotes} width="100" height="50"/>
                </Tab>
                <Tab eventKey={3} title="Tab 3">
                  <PieChart thumbVotes={this.props.thumbVotes}/>
                </Tab>
            </Tabs>
        )
    }
}

export default ThumbVisualization;