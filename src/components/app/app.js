import React, {Component} from "react";
import Search from "../search";
import WeatherCard from "../weather-card";
import {connect} from "react-redux";
import {fetchForecast, fetchCity, fetchSuggestions, fetchSearchInputStatus} from "../../actions";

import "./app.scss";
import {bindActionCreators} from "redux";
import WeatherTabs from "../weather-tabs";
import ForecastTabs from "../forecast-tabs";
import {Route, withRouter} from "react-router-dom";
import {returnStructuredPath} from "../../utils";
import Suggestions from "../suggestions";
import Notification from "../notification";

class App extends Component {

  fetchWeatherForecast = async (city) => await this.props.WeatherService.fetchOneCallForecast(city)

  searchFunc = async (city) => {
    const currentPath = this.props.history.location.pathname;
    const {parameter: pathRest} = returnStructuredPath(currentPath);
    this.props.history.push(`/${city}/${pathRest}`);
  }

  async componentDidMount() {

    const {city: pathCity} = returnStructuredPath(this.props.history.location.pathname);
    document.addEventListener(`click`, this.inputFocus);

    if (pathCity) {
      const forecast = await this.fetchWeatherForecast(pathCity);

      if (forecast instanceof  Error){
        await this.props.fetchCity({city:pathCity, cityNotFound: true});
        return
      }

      await this.props.fetchCity({city: pathCity, cityNotFound: false});
      await this.props.fetchForecast(forecast);
    }
  }

  returnSuggestions = async (string) => {
    string = string.toLowerCase();
    let {suggestions} = await this.props.CityService.fetchCityPrompt(string);

    suggestions = suggestions.filter(({data:{city}}) => {
      if (city) {
        city = city.toLowerCase();
        if (city.includes(string)) {
          return true
        }
        return false;
      }
    }).map(({data: {city, region_with_type, country}}) => {
       return {
        city,
        region_with_type,
        country
      }
    });

    let newSuggestions = [];
    for (let i = 0; i < suggestions.length; i++) {
      if (i === 0){
        newSuggestions.push(suggestions[i])
      }
      else {
        for (let j = 0; j < newSuggestions.length; j++){
          if (j === newSuggestions.length - 1){
            if (suggestions[i].city !== newSuggestions[j].city){
              newSuggestions.push(suggestions[i]);
            }
          }
          else if (suggestions[i].city === newSuggestions[j].city){
            break;
          }
          else {
            continue;
          }
        }
      }
    }

    if (newSuggestions.length > 10){
      newSuggestions.length = 10;
    }

    await this.props.fetchSuggestions(newSuggestions);
  }

  inputFocus = ({target}) =>{
    if (!target.hasAttribute(`data-suggestion`) && !target.hasAttribute(`data-search`) && this.props.searchInputStatus){
      this.props.fetchSearchInputStatus(false);
    }
  }

  async componentDidUpdate(prevProps, prevState) {

    const {city: pathCity} = returnStructuredPath(this.props.history.location.pathname);
    const {city: prevPathCity} = returnStructuredPath(prevProps.location.pathname);

    if (pathCity && pathCity !== prevPathCity) {
      const forecast = await this.fetchWeatherForecast(pathCity);
      if (forecast instanceof  Error){
        await this.props.fetchCity({city:pathCity, cityNotFound: true});
        return
      }
      await this.props.fetchCity({city: pathCity, cityNotFound: false});
      await this.props.fetchForecast(forecast);
    }

    if (prevProps.searchInput !== this.props.searchInput) {
      this.returnSuggestions(this.props.searchInput);
    }
  }

  render() {

    const {city, weatherForecasts: {daily, current}, suggestions, searchInputStatus, cityNotFound} = this.props;

    let routes;
    let suggestionsBlock;

    if (daily && current && city && !cityNotFound) {
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

    if (cityNotFound){

      routes =  (
        <>
          <Notification>{`Данный город не найден`}</Notification>
        </>
      );
    }

    if (suggestions && searchInputStatus){
      suggestionsBlock = <Suggestions suggestionsArr={suggestions}/>
    }

    return (
      <>
        <Route path={`/`} render={() => {
          return (
            <>
              <Search submitFunc={this.searchFunc} changeFunc={this.returnSuggestions}/>
              {suggestionsBlock}
              </>
            );
        }}/>
        {routes}
        <Route path={`/404`} render={() => {
          return (<Notification>{`Нечего не найдено`}</Notification>);
        }} exact/>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchForecast,
    fetchCity,
    fetchSuggestions,
    fetchSearchInputStatus
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {...state};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));