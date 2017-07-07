import React from 'react';
import ReactDOM from 'react-dom';
import {Bar} from 'react-chartjs-2';

const io = require('socket.io-client');
const socket = io();

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartData: {
        labels: ['I DON\'T GET IT', 'NOT REALLY', 'NEUTRAL', 'I ALMOST GET IT', 'I GOT THIS!'],
        datasets: [
          {
            data: this.props.thumbVotes, // this.props.votes
            backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
          }
        ]
      }
    };

    socket.on('thumbVotes', (data) => {
        //make props.changeThumbVotes function // or grab and apss dowwn, invoke in graphs
        console.log('j---------', data.thumbVotes);
        //props.changeThumbVotes([1, 2, 3, 4, 5]); // data.getVotes
        this.setState({barChartData: {
        labels: ['I DON\'T GET IT', 'NOT REALLY', 'NEUTRAL', 'I ALMOST GET IT', 'I GOT THIS!'],
        datasets: [
          {
            data: data.thumbVotes, // this.props.votes
            backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
          }
        ]
      }})
    });
  }

  render() {
    return (
      <div className="barchart">
        <Bar
        data={this.state.barChartData}
        options={{
          title: {
            display: true,
            text: "Thumbs Range",
            fontSize: 25
          },
          legend: {
            display: false,
          },
            scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: '# of Votes',
                fontSize: 20
              },
              ticks: {beginAtZero: true}}]
          },
          layout: {
            padding: {
            left: 40,
            right: 40,
            bottom: 40,
            top: 40
            }
          }
        }}
        />
      </div>
    )
  }

}


export default BarChart;