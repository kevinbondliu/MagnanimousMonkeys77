import React from 'react';
import ReactDOM from 'react-dom';
import {Bar} from 'react-chartjs-2';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartData: {
        label: 'votes',
        labels: ['I DON\'T GET IT', 'thumbs30', 'thumbsMiddle', 'thumbs60', 'thumbsUp'],
        datasets: [
          {
            label: 'Votes',
            data: [5, 10, 8, 7, 9],
            backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
          }
        ]
      }
    }
  }

  render() {
    return (
      <div className="barchart">
        <Bar
        data={this.state.barChartData}
        width={10}
        height={5}
        options={{
          title: {
            diplay:true,
            text:"Thumbs Range"
          },
          legend: {
            display: true,
            position:'right'
          }
        }}
        />
      </div>
    )
  }

}


export default BarChart;
