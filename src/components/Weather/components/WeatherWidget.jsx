// WeatherWidget Component

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import WeatherBannerTab from './WeatherBannerTab';
import MiniWeatherCard from './MiniWeatherCard';

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
    const { forecast } = props;

    let firstMomentOfDay;
    let forecastOfDay = [];
    const forecastOfDayList = [];
    forecast.forEach((item, index) => {
      if (firstMomentOfDay === undefined) {
        firstMomentOfDay = moment.unix(item.dt);
        forecast[index].moment = firstMomentOfDay;
        forecastOfDay.push(item);
      } else {
        const currentMoment = moment.unix(item.dt);
        forecast[index].moment = currentMoment;
        if (firstMomentOfDay.isSame(currentMoment, 'day')) {
          forecastOfDay.push(item);
        } else {
          forecastOfDayList.push(forecastOfDay);
          forecastOfDay = [];
          forecastOfDay.push(item);
          firstMomentOfDay = currentMoment;
        }
      }
    });

    console.log(forecastOfDayList)

    this.state = {
      showNext: true,
      forecastIdx: 5,
      forecastOfDayList
    };

    console.log(forecastOfDayList)
  }

  onMiniCardClick(i) {
    const forecastList = this.state.forecastOfDayList;

    console.log("joseph:", forecastList[i])
    this.setState({ forecastIdx: i });
    this.props.changeWaterLevel(forecastList[i][0]["waterLevel"])
  }

  renderMiniCards = () => {
    const forecastList = this.state.forecastOfDayList;
    const { config, forecast } = this.props;

    const weatherCardList = [];

    let initial = 0;
    if (this.state.showNext) {
      initial = 5;
    }

    for (let i = initial; i < initial + 5; i++) {
      console.log(forecastList[i])
      let label = `H-${i + 1}`;
      if (this.state.showNext) {
        label = `H+${i - 5}`;
      }
      weatherCardList.push(
        <MiniWeatherCard
          onClick={() => this.onMiniCardClick(i)}
          forecastList={forecastList[i]}
          isSelected={this.state.forecastIdx === i}
          unit={config.unit}
          locale={config.locale}
          label={label}
        />
      )
    }

    return weatherCardList
  }

  toggleShowNext = () => {
    this.setState({
      showNext: !this.state.showNext,
    })
  }

  render() {
    const { config, forecast } = this.props;

    const forecastList = this.state.forecastOfDayList;
    console.log(forecastList)
    return (
      <ContentContainer>
        <WeatherBannerTab
          className=""
          location={config.location}
          forecastOfDay={forecastList[this.state.forecastIdx]}
          unit={config.unit}
          locale={config.locale}
        />

        {
          this.state.showNext ? (
            <button type="button" class="btn btn-primary" onClick={this.toggleShowNext}>Show Prev</button>
          ) : (
            <button type="button" class="btn btn-primary" onClick={this.toggleShowNext}>Show Next</button>
          )
        }

        <Next5Container>
          { this.renderMiniCards() }
        </Next5Container>
      </ContentContainer>
    );
  }
}

WeatherWidget.defaultProps = {
  config: PropTypes.arrayOf({
    unit: 'metric',
  }),
};

WeatherWidget.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      temp: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      clouds: PropTypes.number.isRequired,
      wind: PropTypes.number.isRequired,
    }),
  ).isRequired,
  config: PropTypes.shape({
    location: PropTypes.string.isRequired,
    unit: PropTypes.string,
    locale: PropTypes.string,
  }).isRequired,
};

const ContentContainer = styled.div`
  display: block;
  width: 100%;
  margin: 10px 5px;
  text-align: left;
  border: 1px solid #dddddd;
  box-shadow: 3px 3px 3px #aaaaaa;
  padding: 1rem 1rem;
`;

const Next5Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: space-around;
`;

export default WeatherWidget;
