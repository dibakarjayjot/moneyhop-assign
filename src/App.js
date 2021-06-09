import React, { Component } from "react";
import WeatherComponent from "./components/WeatherComponent";
// import ReactChart from "./components/ReactChart";
export default class App extends Component {
  render() {
    return (
      <div>
        <WeatherComponent />
        {/* <ReactChart /> */}
      </div>
    );
  }
}
