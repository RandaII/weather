import React, {Component} from "react";
import Search from "../search";
import WeatherCard from "../weather-card";
import {connect} from "react-redux";
import {fetchForecast, fetchCity} from "../../actions";

import "./app.scss";
import {bindActionCreators} from "redux";
import WeatherTabs from "../weather-tabs";
import ForecastTabs from "../forecast-tabs";
import {Route, withRouter} from "react-router-dom";
import {returnStructuredPath} from "../../utils";

class App extends Component {

  fetchWeatherForecast = async (city) => {
    const forecast = await this.props.WeatherService.fetchOneCallForecast(city)
    await this.props.fetchForecast(forecast);
  }

  searchFunc = async (city) => {
    const currentPath = this.props.history.location.pathname;
    const {parameter: pathRest} = returnStructuredPath(currentPath);
    this.props.history.push(`/${city}/${pathRest}`);
  }


  async componentDidMount() {
    const {city: pathCity} = returnStructuredPath(this.props.history.location.pathname);

    if (pathCity) {
      await this.props.fetchCity(pathCity);
      this.fetchWeatherForecast(this.props.city);
      return;
    }
  }

  async componentDidUpdate(prevProps, prevState) {

    const {city: pathCity} = returnStructuredPath(this.props.history.location.pathname);

    if (pathCity && pathCity !== this.props.city) {
      await this.props.fetchCity(pathCity);
      this.fetchWeatherForecast(pathCity);
    }
  }

  render() {

    const {city, weatherForecasts: {daily, current}} = this.props;

    let routes;

    if (daily && current && city) {
      routes = (
        <>

          <Route render={() => {
            return (<ForecastTabs city={city}/>);
          }}/>

          <Route path={`/${city}/now`} render={() =>
            (<WeatherCard template="current"/>)
          } exact/>


          <Route path={`/${city}/`} render={({match}) => {

            const {id} = match.params;

            return (<>
              <WeatherTabs activeTabId={id}/>
              <WeatherCard template="oneDay" dayId="1-day"/>
            </>);
          }} exact/>

          <Route path={`/${city}/:id`} render={({match}) => {

            const {id} = match.params;

            const pathRegExp = /\d+-day/gm;

            if (!pathRegExp.test(id)) {
              return;
            }

            return (<>
              <WeatherTabs activeTabId={id}/>
              <WeatherCard template="oneDay" dayId={id}/>
            </>);
          }} exact/>

          <Route path={`/${city}/week`} render={() => {
            return (<WeatherCard template="sevenDays"/>);
          }} exact/>
        </>
      );
    }
    return (
      <>
        <Route path={`/`} render={() => {
          return (<Search submitFunc={this.searchFunc}/>);
        }}/>
        {routes}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchForecast,
    fetchCity
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {...state};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));