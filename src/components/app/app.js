import React, {Component} from "react";
import Search from "../search";
import WeatherCard from "../weather-card";
import {connect} from "react-redux";
import {fetchForecast, fetchCity} from "../../actions";

import "./app.scss";
import {bindActionCreators} from "redux";

class App extends Component{

  fetchWeatherForecast = async (city, forecastType) =>{
    const forecast = await this.props.WeatherService.fetchForecast(city, forecastType)
    await this.props.fetchForecast({[forecastType]: forecast});
  }

  searchFunc = async (city) => await this.props.fetchCity(city);

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.city !== this.props.city){
      this.fetchWeatherForecast(this.props.city, `daily`);
    }
  }

  render() {

    const {city, weatherForecasts:{daily}} = this.props;

    return (
      <>
        <Search submitFunc ={this.searchFunc}></Search>
        <section className="weather-cards">
          {daily && <WeatherCard city={city} values={daily}/>}
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