import React from 'react';
import Countdown from './Countdown.jsx';
import MultipleChoiceVisualization from './MultipleChoiceVisualization.jsx';
import MultipleChoiceVisualizationStudent from './MultipleChoiceVisualizationStudent.jsx';

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
          {this.props.view === 'student' ?

          <MultipleChoiceVisualizationStudent
            answerChoice = {this.props.answerChoice}
            changeAnswerChoice = {this.props.changeAnswerChoice}/>
          :<MultipleChoiceVisualization
            answerChoice = {this.props.answerChoice}
            changeAnswerChoice = {this.props.changeAnswerChoice}
          />
          }
        </div>
        {this.props.countdown !== 0
					? <Countdown
							countdown={this.props.countdown}
						/>
					: <div className="col-xs-12 text-center">
						<div
								className="btn btn-lg btn-danger"
								onClick={this.props.clearThumbsCheck}
							>
								Clear Choices
							</div>
						</div>}
      </div>
    )
  }
}

export default MultipleChoice;