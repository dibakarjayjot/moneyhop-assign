import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default class ReactChart extends Component {
    componentDidMount() {
        axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?zip=10001,us&appid=appid=d875df780f1c9d3196fe5c1754363335
    `
      )
      .then((response) => {
        console.log("data", response.data);
        
      });
    }
  state = {
    data: {
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  render() {
    const { data, options } = this.state;
    return (
      <div>
        <Line data={data} options={options} />
      </div>
    );
  }
}
