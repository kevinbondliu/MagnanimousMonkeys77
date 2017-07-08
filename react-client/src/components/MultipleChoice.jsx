import React from 'react';
import Countdown from './Countdown.jsx';
import MultipleChoiceVisualization from './MultipleChoiceVisualization.jsx';

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render () {
    return (
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-12 text-center heading">
  					Input Your Answer
          </div>
				</div>
        <div className="row student">
          <MultipleChoiceVisualization
            answerChoice = {this.props.answerChoice}
            changeAnswerChoice = {this.props.changeAnswerChoice}
          />
        </div>
        <Countdown countdown={this.props.countdown} />
      </div>
    )
  }
}

export default MultipleChoice;