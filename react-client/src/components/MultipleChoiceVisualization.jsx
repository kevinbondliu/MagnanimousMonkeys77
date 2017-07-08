import React from 'react';
import BarChart from './barChart.jsx';
import PieChart from './PieChart.jsx';
import { Tabs, Tab } from 'react-bootstrap';


class MultipleChoiceVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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
          <BarChart width="100" height="50" />
        </Tab>
        <Tab eventKey={2} title="Tab 2">
          <PieChart />
        </Tab>
      </Tabs>
    )
  }
}

export default MultipleChoiceVisualization;