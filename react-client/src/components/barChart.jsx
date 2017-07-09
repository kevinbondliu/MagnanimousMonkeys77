import React from 'react';
import ReactDOM from 'react-dom';
import { Bar } from 'react-chartjs-2';

const io = require('socket.io-client');
const socket = io();

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVotes: [0, 0, 0, 0, 0],
      barChartData: {
        labels: ['', '', '', '', ''],
        datasets: [
          {
            data: this.props.thumbVotes, // this.props.votes
            backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
          }
        ]
      }
    };


    socket.on('thumbVotes', (data) => {

      this.setState({ totalVotes: data.thumbVotes });
      //console.log('Thumbs data BAR', data.thumbVotes);
      this.setState({
        barChartData: {
          labels: ['I DON\'T GET IT', 'NOT REALLY', 'NEUTRAL', 'I ALMOST GET IT', 'I GOT THIS!'],
          datasets: [
            {
              data: data.thumbVotes, // this.props.votes
              backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
            }
          ]
        }
      })
    });

    socket.on('totalAnswers', (data) => {

      var votes = data.getTotalCount;
      var choices = [];
      for (var options in votes) {
        choices.push(votes[options]);
      }
      //console.log('Choices data BAR', choices);
      choices = choices.reverse();

      this.setState({ totalVotes: data.thumbVotes });
      console.log('Thumbs data BAR', data.thumbVotes);
      this.setState({
        barChartData: {
          labels: ['E', 'D', 'C', 'B', 'A'],
          datasets: [
            {
              data: choices, // this.props.votes
              backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
            }
          ]
        }
      })
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
              text: "Student Votes",
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
                ticks: { beginAtZero: true, suggestedMax: 10 }
              }]
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