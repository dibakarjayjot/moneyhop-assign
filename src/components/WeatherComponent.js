import axios from "axios";
import React, { Component } from "react";
export default class App extends Component {
  state = {
    zipCode: 10001,
    location: "",
    weather: "",
    temperature: null,
    maxTemperature: null,
    minTemperature: null,
    windSpeed: null,
    humidity: null,
    pressure: null,
    sunrise: null,
    sunset: null,
    buttonContent: "Show Other Data",
    toggleContent: false,
  };
  changeZipCode = (e) => {
    this.setState(
      {
        zipCode: e.target.value,
      },
      () => {
        const { zipCode } = this.state;
        if (zipCode.length === 5) {
          this.callWeatherApi();
        }
      }
    );
  };

  componentDidMount() {
    this.callWeatherApi();
  }

  callWeatherApi = () => {
    const { zipCode } = this.state;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=d875df780f1c9d3196fe5c1754363335
    `
      )
      .then((response) => {
        console.log("data", response.data);
        const { data } = response;
        const { main, sys } = data;
        this.setState({
          location: data.name,
          weather: data.weather[0].main,
          temperature: main.temp,
          maxTemperature: main.temp_max,
          minTemperature: main.temp_min,
          windSpeed: data.wind.speed,
          humidity: main.humidity,
          pressure: main.pressure,
          sunrise: sys.sunrise,
          sunset: sys.sunset,
          buttonContent: "Show Other Data",
          toggleContent: false,
        });
      });
  };
  render() {
    const {
      zipCode,
      location,
      weather,
      temperature,
      maxTemperature,
      minTemperature,
      buttonContent,
      toggleContent,
      windSpeed,
      humidity,
      pressure,
      sunrise,
      sunset,
    } = this.state;
    return (
      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="number"
              value={zipCode}
              onChange={this.changeZipCode}
              className="InputStyle"
              placeholder="Search Zip Code"
            />{" "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            {!toggleContent && location !== "" ? (
              <p> Location : {location} </p>
            ) : null}

            {!toggleContent && weather !== "" ? (
              <p> Weather : {weather} </p>
            ) : null}

            {!toggleContent && temperature != null ? (
              <p> Temperature : {temperature} </p>
            ) : null}

            {!toggleContent && maxTemperature != null ? (
              <p> Todays Max Temperature : {maxTemperature} </p>
            ) : null}

            {!toggleContent && minTemperature != null ? (
              <p> Todays Min Temperature : {minTemperature} </p>
            ) : null}

            {toggleContent && windSpeed != null ? (
              <p> WindSpeed : {windSpeed} </p>
            ) : null}

            {toggleContent && humidity != null ? (
              <p> Humidity : {humidity} </p>
            ) : null}

            {toggleContent && windSpeed != null ? (
              <p> Pressure : {pressure} </p>
            ) : null}

            {toggleContent && sunrise != null ? (
              <p> Sunrise : {`${new Date(sunrise)}`}</p>
            ) : null}

            {toggleContent && sunset != null ? (
              <p> Sunset : {`${new Date(sunset)}`} </p>
            ) : null}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              className="buttonStyles"
              onClick={() => {
                this.setState(
                  {
                    toggleContent: !this.state.toggleContent,
                  },
                  () => {
                    const { toggleContent } = this.state;

                    if (toggleContent) {
                      this.setState({
                        buttonContent: "Show Prev Data",
                      });
                    } else {
                      this.setState({
                        buttonContent: "Show Other Data",
                      });
                    }
                  }
                );
              }}
            >
              {buttonContent}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
