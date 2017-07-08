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

  getAnswer(event) {
    this.props.changeAnswerChoice(event.target.value);
  }

  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Tab 1">
            <div class="checkbox" className = 'option'>
              <label><input type="checkbox" value="A" onChange = {this.getAnswer.bind(this)}/>Option 1</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="B" onChange = {this.getAnswer.bind(this)}/>Option 2</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="C" onChange = {this.getAnswer.bind(this)}/>Option 3</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="D" onChange = {this.getAnswer.bind(this)}/>Option 2</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" value="E" onChange = {this.getAnswer.bind(this)}/>Option 3</label>
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