import React, {Component} from "react";
import Search from "../search";
import WeatherCard from "../weather-card";
import {connect} from "react-redux";
import {fetchForecast, fetchCity} from "../../actions";

import "./app.scss";
import {bindActionCreators} from "redux";
import WeatherTabs from "../weather-tabs";

class App extends Component{

  fetchWeatherForecast = async (city, forecastType) =>{
    // const forecast = await this.props.WeatherService.fetchForecast(city, forecastType)
    const forecast = await this.props.WeatherService.fetchOneCallForecast(city)
    await this.props.fetchForecast(forecast);
    // await this.props.fetchForecast({[forecastType]: forecast});
  }

  searchFunc = async (city) => await this.props.fetchCity(city);

  componentDidMount() {
     this.fetchWeatherForecast(this.props.city, `current`);
     // this.fetchWeatherForecast(this.props.city, `daily`);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.city !== this.props.city){
      this.fetchWeatherForecast(this.props.city, `current`);
    }
  }

  render() {

    const {city, weatherForecasts:{daily, current, timezone_offset}} = this.props;

    let test;

    // if (daily){
    //   test = daily.slice(0);
    //   test.length = 3;
    // }

    // if (current){
    //   test = daily;
    // }


    return (
      <>
        <Search submitFunc ={this.searchFunc}></Search>
        {/*{daily && <WeatherTabs values={test}/>}*/}
        <section className="weather-cards">
          {current && <WeatherCard city={city} values={current} timezoneOffset={timezone_offset}/>}
          {/*{daily && <WeatherCard city={city} values={daily}/>}*/}
        </section>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    fetchForecast,
    fetchCity
  }, dispatch);
}

const mapStateToProps = (state)=>{
  return {...state};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);