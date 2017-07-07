import React from 'react';
import Countdown from './Countdown.jsx';

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
          <div class="checkbox">
            <label><input type="checkbox" value=""/>>Option 1</label>
          </div>  
          <div class="checkbox">
            <label><input type="checkbox" value=""/>>Option 2</label>
          </div>
          <div class="checkbox">
            <label><input type="checkbox" value=""/>Option 3</label>
          </div>
        </div>
        <Countdown countdown={this.props.countdown} />
      </div>
    )
  }
}

export default MultipleChoice;