import React from 'react';
import ReactDOM from 'react-dom';
import {Pie} from 'react-chartjs-2';

const io = require('socket.io-client');
const socket = io();

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: [1, 2, 3, 4, 5], //grab storage from db
      totalVotes: [0, 0, 0, 0, 0],
      pieChartData: {
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
      let storage = this.state.storage;
      let total = this.state.totalVotes;
      //total[thumbVotes.indexOf(1)]++;
      this.setState({totalVotes: data.thumbVotes});

        console.log('votes', data.thumbVotes);

        var temp = [];
        for (var i = 0; i < 5; i++) {
          temp.push(storage[i] + total[i]);
        }
        setTimeout(() => { this.setState({storage: temp}) } , 32000);

        this.setState({barChartData: {
        labels: ['I DON\'T GET IT', 'NOT REALLY', 'NEUTRAL', 'I ALMOST GET IT', 'I GOT THIS!'],
        datasets: [
          {
            data: temp, // this.props.votes
            backgroundColor: ['rgba(255, 45, 45, 0.8)', 'rgba(51, 153, 255, 0.8)', 'rgba(255, 255, 102, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)']
          }
        ]
      }})
    });
  }

  render() {
    return (
      <div className="piechart">
        <Pie
        data={this.state.pieChartData}
        options={{
          title: {
            display: true,
            text: "Thumbs Range",
            fontSize: 25
          },
          legend: {
            display: true,
            position:'right'
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


export default PieChart;