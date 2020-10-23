import React, { Component } from 'react';
// import './App.css';

import WeatherWidget from './components/WeatherWidget';
import testData from './testData.json';


const forecastData = testData.list.map(data => ({
  dt: data.dt,
  temp: (data.temp_min + data.temp_max) / 2,
  temp_min: data.temp_min,
  temp_max: data.temp_max,
  humidity: data.humidity,
  icon: data.weather_icon,
  desc: data.weather_description,
  clouds: data.cloud,
  wind: data.wind_speed,
  waterLevel: data.floodLevel,
}));

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WeatherWidget
        config={{ location: 'DKI Jakarta', unit: 'metric', locale: 'zh-tw' }}
        forecast={forecastData}
        changeWaterLevel={this.props.changeWaterLevel}
      />
    );
  }
}

export default Weather;
