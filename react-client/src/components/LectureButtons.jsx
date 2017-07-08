import React from 'react';
import axios from 'axios';

class LectureButtons extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

  onThumbsCheck () {
  	console.log('onThumbsCheck is being called');
  	console.log('this.props.lectureId', this.props.lectureId);
    axios({
	    method: 'post',
	    url: '/checkthumbs',
	    params: {
	      lecture_id: this.props.lectureId
	    }
	  }).then((response) => {
			console.log('this is the response', response);
  		this.props.startThumbsCheck(response.data.questionId);
	  }).catch((error) => {
	  	console.log(error);
	  })
  }

	onMultipleChoice () {
		console.log('onMultipleChoice');
		axios({
			method: 'post',
			url: '/multipleChoiceServer',
			params: {
				lecture_id: this.props.lectureId
			}
		}).then((response) => {
			console.log('multiple choice response', response)
			this.props.startMultipleChoice(response.data.questionId);
		}).catch((error) => {
			console.log(error);
		})
	}

	render () {
		return (
			<div className="row">
				<div className="col-xs-12 text-center">
					<div
						className="btn btn-lg btn-success"
						onClick={this.onThumbsCheck.bind(this)}>
						Check Thumbs
					</div>
				</div>
				<div className="col-xs-12 text-center">
					<div
						className="btn btn-lg btn-info"
						onClick={this.onMultipleChoice.bind(this)}>
						Multiple Choice
					</div>
				</div>
				<div className="col-xs-12 text-center">
					<div
						className="btn btn-lg btn-danger"
						onClick={this.props.endLecture}>
						End Lecture
					</div>
				</div>
		  </div>
		)
	}

}

export default LectureButtons;
