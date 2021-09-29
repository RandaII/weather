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
    const forecast = await this.props.WeatherService.fetchForecast(city, forecastType)
    await this.props.fetchForecast({[forecastType]: forecast});
  }

  searchFunc = async (city) => await this.props.fetchCity(city);

  componentDidMount() {
    this.fetchWeatherForecast(this.props.city, `daily`);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.city !== this.props.city){
      this.fetchWeatherForecast(this.props.city, `daily`);
    }
  }

  render() {

    const {city, weatherForecasts:{daily}} = this.props;

    let test;

    if (daily){
      test = daily.slice(0);
      test.length = 3;
    }


    return (
      <>
        <Search submitFunc ={this.searchFunc}></Search>
        {daily && <WeatherTabs values={test}/>}
        <section className="weather-cards">
          {daily && <WeatherCard city={city} values={test}/>}
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