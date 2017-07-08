import React from 'react'
import ThumbVisualization from './ThumbVisualization.jsx';
import Countdown from './Countdown.jsx';
import axios from 'axios';

class ThumbsChecker extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			saveFile : ''
    }
	}
	
	saveFile() {
		console.log('Up and running, Capitan', this.props.lectureId);
		axios({
            method: 'post',
            url: '/saveFile',
            params: {
                lectureId: this.props.lectureId
            }
        }).then(result => {
					var result64 = window.btoa(result.data); 
					var returnData = 'data:application/octet-stream;charset=utf-16le;base64, ' + result64;
					this.setState({saveFile: <a className="centersave" href={returnData} >Download Here!</a> })
				})
		}

  

	render () {
		var saveLecture = this.saveFile.bind(this); 
		return (
			
			<div className="row">
				<div className="col-xs-12 text-center heading">
					Class average
				</div>
				<ThumbVisualization
					thumbValue={this.props.thumbValue}
					thumbVotes={this.props.thumbVotes}
					changeThumbVotes={this.props.changeThumbVotes}
				/>
				{this.props.countdown !== 0
					? <Countdown
							countdown={this.props.countdown}
						/>
					: <div className="col-xs-12 text-center">
						<div
								className="btn btn-lg btn-danger"
								onClick={this.props.clearThumbsCheck}
							>
								Clear Thumbs
							</div>
						<div 
							className="btn btn-lg btn-danger savefile"
							onClick={function() {saveLecture()}}
						>Save File</div>
						</div>}
						{this.state.saveFile}
			</div>
	  )
   }
}

export default ThumbsChecker;
