import React from 'react';
import BarChart from './barChart.jsx';
import PieChart from './PieChart.jsx';
import { Tabs, Tab } from 'react-bootstrap';


class MultipleChoiceVisualizationStudent extends React.Component {
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
      <div>
        <div class="checkbox" className='option'>
          <label><input type="checkbox" value="A" onChange={this.getAnswer.bind(this)} />Option 1</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" value="B" onChange={this.getAnswer.bind(this)} />Option 2</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" value="C" onChange={this.getAnswer.bind(this)} />Option 3</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" value="D" onChange={this.getAnswer.bind(this)} />Option 2</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" value="E" onChange={this.getAnswer.bind(this)} />Option 3</label>
        </div>
      </div>
    )
  }
}

export default MultipleChoiceVisualizationStudent;