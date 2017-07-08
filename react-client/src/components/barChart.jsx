import React from 'react';
import ReactDOM from 'react-dom';
import {Bar} from 'react-chartjs-2';

const io = require('socket.io-client');
const socket = io();

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: [0, 0, 0, 0, 0], //grab storage from db
      totalVotes: [0, 0, 0, 0, 0],
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

    var counter = 0;
    socket.on('thumbVotes', (data) => {
      counter++;
      let storage = this.state.storage;
      let total = this.state.totalVotes;
      //total[thumbVotes.indexOf(1)]++;
      this.setState({totalVotes: data.thumbVotes});

        console.log('votes', data.thumbVotes);

        var temp = [];
        var ind = data.thumbVotes.indexOf(1);
        for (var i = 0; i < 5; i++) {
          temp[i] = storage[i] + total[i];
        }



        //setTimeout(() => { this.setState({storage: temp}) } , 32000);
        console.log('counter---', counter);
        console.log('temp-----', temp);
        if (counter === 30) {
          //handle server to insert into db
          //this.setState({storage: temp});
        }

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