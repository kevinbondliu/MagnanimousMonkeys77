import React from 'react';
import BarChart from './BarChart.jsx';
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
            <div class="checkbox" className = 'option'>
              <label><input type="checkbox" value="A" onChange = {this.props.changeAnswerChoice}/>Option 1</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="B" onChange = {this.props.changeAnswerChoice}/>Option 2</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="C" onChange = {this.props.changeAnswerChoice}/>Option 3</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="D" onChange = {this.props.changeAnswerChoice}/>Option 2</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="E" onChange = {this.props.changeAnswerChoice}/>Option 3</label>
            </div>
        </Tab>
        <Tab eventKey={2} title="Tab 2">
          <BarChart width="100" height="50" />
        </Tab>
        <Tab eventKey={3} title="Tab 3">
          <PieChart />
        </Tab>
      </Tabs>
    )
  }
}

export default MultipleChoiceVisualization;