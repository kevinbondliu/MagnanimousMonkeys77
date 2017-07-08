import React from 'react';
import LectureStarter from './LectureStarter.jsx';
import LectureButtons from './LectureButtons.jsx';
import ThumbsChecker from './ThumbsChecker.jsx';
import MultipleChoice from './MultipleChoice.jsx';

const io = require('socket.io-client');
const socket = io();

class Instructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('props', props);

    socket.on('averageThumbValue', (data) => {
      if (props.view === 'instructor') {
        //console.log('dataXXX', data);
        props.changeThumbValue(data.averageThumbValue);
      }
    })

    socket.on('totalAnswers', (data) => {
      if (props.view === 'instructor') {
        console.log('HERE IS THE DATA data', data);
      }
    })

  }

  render() {
    return (
      <div>
        {this.props.lectureStatus === 'lectureNotStarted'
          ? <LectureStarter
            startLecture={this.props.startLecture}
          />
          : this.props.lectureStatus === 'lectureStarted'
            ? <LectureButtons
              lectureId={this.props.lectureId}
              startThumbsCheck={this.props.startThumbsCheck}
              endLecture={this.props.endLecture}
              startMultipleChoice = {this.props.startMultipleChoice}
            />
            : this.props.lectureStatus === 'checkingThumbs'
              ? <ThumbsChecker
                startLecture={this.props.startLecture}
                lectureId={this.props.lectureId}
                countdown={this.props.countdown}
                thumbValue={this.props.thumbValue}
                thumbVotes={this.props.thumbVotes}
                clearThumbsCheck={this.props.clearThumbsCheck}
                changeThumbVotes={this.props.changeThumbVotes}
              />
              : <MultipleChoice
                countdown={this.props.countdown}
                answerChoice={this.props.answerChoice}
                changeAnswerChoice={this.props.changeAnswerChoice}
              />}
      </div>
    )
  }
}

export default Instructor;
