import React from 'react';
import Waiting from './Waiting.jsx';
import ThumbInput from './ThumbInput.jsx';
import MultipleChoice from './MultipleChoice.jsx'
const io = require('socket.io-client');
const socket = io();

class Student extends React
.Component {
  constructor(props) {
    super(props);
    this.state = {};

    socket.on('lectureStarted', (data) => {
      props.startLecture(data.lectureId, data.lectureName);
    })

    socket.on('checkingThumbs', (data) => {
      props.startThumbsCheck(data.questionId);
      //
    })

    socket.on('multipleChoice', (data) => {
      props.startMultipleChoice(data.questionId);
    })

    socket.on('lectureEnded', (data) => {
      props.endLectureStudent();
    })
  }

  render () {
    return (
      <div className="row">
        {this.props.lectureStatus === 'lectureNotStarted'
        ? <Waiting
            waitingFor={'lecture'}
            givenName={this.props.givenName}
          />
        : this.props.lectureStatus === 'lectureStarted'
        ? <Waiting
            waitingFor={'question'}
            givenName={this.props.givenName}
            lectureName={this.props.lectureName}
          />
        : this.props.lectureStatus === 'checkingThumbs'
        ?
            <ThumbInput
            countdown={this.props.countdown}
            thumbValue={this.props.thumbValue}
            changeThumbValue={this.props.changeThumbValue}
          />
        :
          <MultipleChoice
          countdown={this.props.countdown}
          answerChoice = {this.props.answerChoice}
          changeAnswerChoice = {this.props.changeAnswerChoice}
          view = {this.props.view}
          />}
      </div>
    )
  }
}

export default Student;
