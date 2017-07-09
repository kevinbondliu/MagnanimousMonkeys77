import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Student from './components/Student.jsx';
import Instructor from './components/Instructor.jsx';
import RoleSelection from './components/RoleSelection.jsx'
import axios from 'axios';
const io = require('socket.io-client');
const socket = io();

var countdownInterval;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: '',
            tokenId: '',
            lectureStatus: 'lectureNotStarted',
            lectureId: '',
            questionId: '',
            thumbValue: 2,
            thumbVotes: [1, 6, 10, 9, 7],
            countdown: 30,
            givenName: '',
            lectureName: 'lobby',
            roomChange: '',
            answerChoice: ''
        }
        this.role;
    }

    componentDidMount() {
        this.setState({ view: 'roleSelect' });
    }

    onSignIn(googleUser) {
        let tokenId = googleUser.tokenId;
        axios({
            method: 'get',
            url: '/googleLogin',
            params: {
                tokenId: tokenId,
                role: this.role
            }
        })
            .then(result => {

                socket.emit('lectureName', { room: 'lobby' });
                if (result.data[0].user_type === 'STUDENT') {
                    this.setState({ view: 'student' });
                } else if (result.data[0].user_type === 'INSTRUCTOR') {
                    this.setState({ view: 'instructor' });
                }
                this.setState({ givenName: googleUser.profileObj.givenName })
                socket.emit('username', { username: googleUser.profileObj.email })
                if (result.data[0].user_type === 'INSTRUCTOR') {
                    socket.emit('instructor', { username: googleUser.profileObj.email })
                }
            });

    }

    onFBSignIn(facebookUser) {
        var nameArray = facebookUser.name.split(' ');
        axios({
            method: 'get',
            url: '/FBLogin',
            params: {
                firstName: nameArray[0],
                lastName: nameArray[1],
                email: facebookUser.email,
                role: this.role
            }
        })
            .then(result => {
                console.log('this is the result from fb', result);
                if (result.data[0].user_type === 'STUDENT') {
                    this.setState({ view: 'student' });
                } else if (result.data[0].user_type === 'INSTRUCTOR') {
                    this.setState({ view: 'instructor' });
                }
                this.setState({ givenName: facebookUser.name })
                socket.emit('username', { username: facebookUser.email })
                if (result.data[0].user_type === 'INSTRUCTOR') {
                    socket.emit('instructor', { username: facebookUser.email })
                }
            })
    }

    startLecture(lectureId, lectureName) {
        this.setState({
            lectureStatus: 'lectureStarted',
            lectureId: lectureId,
            lectureName: lectureName
        })
    }

    endLecture() {
        let lectureId = this.state.lectureId;
        console.log(lectureId);
        axios({
            method: 'post',
            url: '/endLecture',
            params: {
                lectureId: lectureId
            }
        }).then((result) => {
            this.setState({
                lectureStatus: 'lectureNotStarted',
                lectureId: ''
            })
        })
    }

    endLectureStudent() {
        this.setState({
            lectureStatus: 'lectureNotStarted'
        })
    }

    setCountdownInterval() {
        countdownInterval = setInterval(() => {
            this.state.countdown === 0
                ? this.clearCountdownInterval()
                : this.setState({ countdown: this.state.countdown - 1 }, () => {
                    console.log('this.state.countdown', this.state.countdown);
                    if (this.state.view === 'student') {
                      if(this.state.lectureStatus === 'multipleChoice') {
                        console.log('it reached here at answerchoice');
                        socket.emit('multipleChoiceAnswer', {answerChoice: this.state.answerChoice});
                      }
                      if(this.state.lectureStatus === 'checkingThumbs') {
                        socket.emit('thumbValue', { thumbValue: this.state.thumbValue });
                      }
                    }
                });
        }, 1000)
    }

    clearCountdownInterval() {
        clearInterval(countdownInterval);
        if (this.state.view === 'student') {
            this.setState({
                lectureStatus: 'lectureStarted',
                questionId: '',
                countdown: 30
            })
        }
    }

    startThumbsCheck(questionId) {
        this.setState({
            lectureStatus: 'checkingThumbs',
            questionId: questionId
        }, this.setCountdownInterval)
    }

    startMultipleChoice(questionId) {
      console.log("started multiple choiec HAODHSLD");
        this.setState({
            lectureStatus: 'multipleChoice',
            questionId: questionId
        }, this.setCountdownInterval)
    }

    endThumbsCheck() {
        this.setState({
            lectureStatus: 'lectureStarted',
            questionId: ''
        })
    }

    clearThumbsCheck() {
        this.setState({
            lectureStatus: 'lectureStarted',
            questionId: '',
            countdown: 30
        })
    }

    changeThumbValue(value) {
        this.setState({
            thumbValue: value
        })
    }
    changeThumbVotes(votes) {
    	this.setState({
    		thumbVotes: votes
    	})
    }

    // calculateAllVotes(oneVote) {
    // 	//oneVote is an array [0,0,1,0,0]

    //   let totalVotes = [0, 0, 0, 0, 0];
    //   let index = oneVote.indexOf(1);
    //   totalVotes[index]++;
    //   //return totalVotes;
    //     setTimeout(() => {
    //     this.setState({      barChartData: {
    //     labels: ['I DON\'T GET IT', 'NOT REALLY', 'NEUTRAL', 'I ALMOST GET IT', 'I GOT THIS!'],
    //     datasets: [
    //       {
    //         data: thumbVotes, // this.props.votes
    //         backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
    //       }
    //     ]
    //   }})
    // 	}, 32000);
    // }

    changeAnswerChoice(value) {
      console.log('this is the value from multiplechoice', value);
        this.setState({
            answerChoice: value
        })
    }

    signOut() {
        // FB.logout(function(response){
        //   console.lg
        // })
        var auth2 = gapi.auth2.getAuthInstance();
        console.log(auth2);
        auth2.signOut().then(function() {
            console.log('User signed out.');
        });
        console.log(this.state.view);
        this.setState({
            view: 'roleSelect'
        })
        window.location.reload();
    }

    changeLecture(lectureName) {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/checkLectures',
            params: {
                lectureName: lectureName
            }
        }).then(result => {
            if (result.data === 1) {
                //console.log('Succesfully found lecture');
                socket.emit('changeLecture', { currentLecture: this.state.lectureName, newLecture: lectureName });
                this.setState({ lectureName: lectureName });
            } else {
                //console.log('Lecture Not Found');
            }
        })

    }
    handleLectureChange(event) {
        event.preventDefault();
        this.changeLecture(this.input.value);
    }

    changeRoles(role) {
      this.role = role;
      console.log(this.role);
      this.setState({
        view: 'login'
      })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                <div className="fb-share-button" data-href="https://pollar-bear.herokuapp.com/" data-layout="button" data-size="large" data-mobile-iframe="true">
                <a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpollar-bear.herokuapp.com%2F&amp;src=sdkpreparse">Share</a>
                </div>
                    <div className="container-fluid">
                        <button className='logout' href="#" onClick={this.signOut.bind(this)}>
                            LogOut!
                        </button>
                        <div className="navbar-header">
                            <a className="navbar-brand">
                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                Thumblr
                            </a>
                        </div>
                    </div>

                </nav>
                <div className="container-fluid main">
                    {this.state.view === 'roleSelect' ?
                        <RoleSelection
                          changeRoles = {this.changeRoles.bind(this)}
                        />
                        : this.state.view === 'login'
                            ? <Login
                                onSignIn={this.onSignIn.bind(this)}
                                onFBSignIn={this.onFBSignIn.bind(this)}
                            />
                            : this.state.view === 'student'
                                ? <Student
                                    answerChoice = {this.state.answerChoice}
                                    changeAnswerChoice = {this.changeAnswerChoice.bind(this)}
                                    thumbValue={this.state.thumbValue}
                                    changeThumbValue={this.changeThumbValue.bind(this)}
                                    startThumbsCheck={this.startThumbsCheck.bind(this)}
                                    startMultipleChoice = {this.startMultipleChoice.bind(this)}
                                    startLecture={this.startLecture.bind(this)}
                                    lectureStatus={this.state.lectureStatus}
                                    countdown={this.state.countdown}
                                    view={this.state.view}
                                    endLectureStudent={this.endLectureStudent.bind(this)}
                                    givenName={this.state.givenName}
                                    lectureName={this.state.lectureName}
                                />
                                : <Instructor
                                    thumbValue={this.state.thumbValue}
                                    thumbVotes={this.state.thumbVotes}
                                    changeAnswerChoice = {this.changeAnswerChoice.bind(this)}
                                    lectureId={this.state.lectureId}
                                    lectureStatus={this.state.lectureStatus}
                                    startLecture={this.startLecture.bind(this)}
                                    endLecture={this.endLecture.bind(this)}
                                    startThumbsCheck={this.startThumbsCheck.bind(this)}
                                    startMultipleChoice = {this.startMultipleChoice.bind(this)}
                                    countdown={this.state.countdown}
                                    changeThumbValue={this.changeThumbValue.bind(this)}
                                    changeThumbVotes={this.changeThumbVotes.bind(this)}
                                    clearThumbsCheck={this.clearThumbsCheck.bind(this)}
                                    view={this.state.view}
                                    givenName={this.state.givenName}
                                    lectureName={this.state.lectureName}
                                />}
                </div>
            </div>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
