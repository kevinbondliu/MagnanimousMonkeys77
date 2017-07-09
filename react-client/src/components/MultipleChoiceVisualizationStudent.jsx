import React from 'react';
import BarChart from './barChart.jsx';
import PieChart from './PieChart.jsx';
import { Tabs, Tab } from 'react-bootstrap';


class MultipleChoiceVisualizationStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false
    }
    this.clearChecks = this.clearChecks.bind(this);
    this.selectCheck = this.selectCheck.bind(this);
  }

  getInitialState() {
    return {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });
  }

  clearChecks() {
    this.setState({
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false
    })
  }
  getAnswer(event) {
    this.clearChecks();
    this.props.changeAnswerChoice(event.target.value);
    this.selectCheck(event.target.value);
  }

  selectCheck(input) {
    console.log('this is the input', input);
    var InputArray = ['A','B','C','D','E'];
    for(var i = 0; i < InputArray.length; i ++) {
      if(input === InputArray[i]) {
        var check = {};
        check['checked' + (i + 1)] = true;
        this.setState(check);
      }
    }

    // if (input === 'A') {
    //   this.setState({
    //     checked1: true
    //   })
    // }
    // if (input === 'B') {
    //   this.setState({
    //     checked1: true
    //   })
    // }
    // if (input === 'C') {
    //   this.setState({
    //     checked1: true
    //   })
    // }
    // if (input === 'D') {
    //   this.setState({
    //     checked1: true
    //   })
    // }
    // if (input === 'E') {
    //   this.setState({
    //     checked1: true
    //   })
    // }
  }

  render() {
    return (
      <div>
        <div class="checkbox" className='option'>
          <label><input checked={this.state.checked1} type="checkbox" value="A" onChange={this.getAnswer.bind(this)} />Option 1</label>
        </div>
        <div class="checkbox">
          <label><input checked={this.state.checked2} type="checkbox" value="B" onChange={this.getAnswer.bind(this)} />Option 2</label>
        </div>
        <div class="checkbox">
          <label><input checked={this.state.checked3} type="checkbox" value="C" onChange={this.getAnswer.bind(this)} />Option 3</label>
        </div>
        <div class="checkbox">
          <label><input checked={this.state.checked4} type="checkbox" value="D" onChange={this.getAnswer.bind(this)} />Option 2</label>
        </div>
        <div class="checkbox">
          <label><input checked={this.state.checked5} type="checkbox" value="E" onChange={this.getAnswer.bind(this)} />Option 3</label>
        </div>
      </div>
    )
  }
}

export default MultipleChoiceVisualizationStudent;