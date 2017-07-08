import React from 'react';

class ThumbVisualizationStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
          <div className="col-xs-12 thumb-visualization text-center">
          <i style={{transform: `rotate(${(45 * this.props.thumbValue) - 180}deg)`, transition: "300ms ease all"}} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
          </div>
        )
    }
}

export default ThumbVisualizationStudent;