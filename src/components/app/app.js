import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchForecast, fetchCity, fetchSuggestions, fetchSearchInputStatus} from "../../actions";
import {Route, withRouter} from "react-router-dom";
import {returnStructuredPath} from "../../utils";
import PropTypes from "prop-types";

import Search from "../search";
import Suggestions from "../suggestions";
import ForecastTabs from "../forecast-tabs";
import WeatherTabs from "../weather-tabs";
import WeatherCard from "../weather-card";
import Notification from "../notification";
import Spinner from "../spinner";
import ErrorBoundary from "../error-boundary";
import "./app.scss";

class App extends Component {

  static defaultProps = {
    CityService: PropTypes.object.isRequired,
    WeatherService: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    fetchCity: PropTypes.func.isRequired,
    fetchForecast: PropTypes.func.isRequired,
    fetchSearchInputStatus: PropTypes.func.isRequired,
    fetchSuggestions: PropTypes.func.isRequired,
    city: PropTypes.string.isRequired,
    cityNotFound: PropTypes.bool.isRequired ,
    searchInput: PropTypes.string.isRequired,
    searchInputStatus: PropTypes.bool.isRequired ,
    weatherForecasts: PropTypes.shape({
      current: PropTypes.object.isRequired,
      daily: PropTypes.array.isRequired
    }).isRequired
  }

  state = {
    loading: false,
    timer: null
  }

  fetchWeatherForecast = async (city) => await this.props.WeatherService.fetchOneCallForecast(city)

  // отправить в store прогноз и текущий город
  fetchForecastAndCity = async (city) =>{
    const forecast = await this.fetchWeatherForecast(city);

    if (forecast instanceof  Error){
      await this.props.fetchCity({city, cityNotFound: true});
      return
    }

    await this.props.fetchCity({city, cityNotFound: false});
    await this.props.fetchForecast(forecast);
  }

  searchSubmitFunc = async (city) => {
    const currentPath = this.props.history.location.pathname;
    const {parameter: pathRest} = returnStructuredPath(currentPath);
    this.props.history.push(`/${city}/${pathRest}`);
  }

  // отправить в store city suggestions
  returnSuggestions = async (string) => {
    string = string.toLowerCase();
    let {suggestions} = await this.props.CityService.fetchCityPrompt(string);

    suggestions = suggestions.filter(({data:{city}}) => {
      // фильтруем массив, оставляя только те города, что соответствуют строке
      if (city) {
        city = city.toLowerCase();
        if (city.includes(string)) {
          return true
        }
        return false;
      }
    }).map(({data: {city, region_with_type, country}}) => {
      // меняем структуру, каждого объекта
      return {
        city,
        region_with_type,
        country
      }
    });

    // исключаем повторы в результатах
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

    // обрезаем массив если кол-во объектов > 10
    if (newSuggestions.length > 10){
      newSuggestions.length = 10;
    }

    await this.props.fetchSuggestions(newSuggestions);
  }

  // функция для смены статуса активности search-input
  inputFocusFunc = ({target}) =>{
    if (!target.dataset.suggestion && !target.dataset.search && this.props.searchInputStatus){
      this.props.fetchSearchInputStatus(false);
    }
  }

  async componentDidMount() {

    const {city: pathCity} = returnStructuredPath(this.props.history.location.pathname);
    document.addEventListener(`click`, this.inputFocusFunc);

    // если в url присутствует город, получаем прогноз и отправляем его в store
    if (pathCity) {
      this.setState({loading:true});
      await this.fetchForecastAndCity(pathCity);
      this.setState({loading:false});
    }
  }

  async componentDidUpdate(prevProps) {

    const {city: pathCity} = returnStructuredPath(this.props.history.location.pathname);
    const {city: prevPathCity} = returnStructuredPath(prevProps.location.pathname);

    // в случае изменения города в url получаем и отправляем в store обновленный прогноз
    if (pathCity && pathCity !== prevPathCity) {
      this.setState({loading:true});
      await this.fetchForecastAndCity(pathCity);
      this.setState({loading:false});
    }

    // при вводе в input ставим таймер на отправку в store найденных городов
    if (prevProps.searchInput !== this.props.searchInput) {
      clearTimeout(this.state.timer);
      this.setState({timer: setTimeout(() =>{
          this.returnSuggestions(this.props.searchInput);
        },250)});
    }
  }

  render() {

    const {city, weatherForecasts: {daily, current}, suggestions, searchInputStatus, cityNotFound} = this.props;
    const {loading} = this.state;

    let routes, suggestionsBlock;

    if (daily && current && city && !cityNotFound && !loading) {
      routes = (
        <ErrorBoundary>
          <Route render={() =>(<ForecastTabs city={city}/>)}/>

          <Route path={`/${city}/now`} exact
                 render={() => (<WeatherCard template="current"/>)}/>

          <Route path={`/${city}/`} exact render={({match:{params:{id}}}) =>
             (<><WeatherTabs activeTabId={id}/>
                <WeatherCard template="oneDay" dayId="1-day"/></>)
          }/>

          <Route path={`/${city}/:id`} exact render={({match}) => {

            const {id} = match.params;

            const pathRegExp = /\d+-day/gm;

            if (!pathRegExp.test(id)) {
              return;
            }

            return (<><WeatherTabs activeTabId={id}/>
                      <WeatherCard template="oneDay" dayId={id}/></>);
          }}/>

          <Route path={`/${city}/week`} exact
                 render={() => (<WeatherCard template="sevenDays"/>)}/>
        </ErrorBoundary>);
    }

    if (cityNotFound){
      routes = (<Notification>{`Данный город не найден`}</Notification>);
    }

    if (suggestions && searchInputStatus){
      suggestionsBlock = <ErrorBoundary errorEmptyComponent={true}><Suggestions suggestionsArr={suggestions}/></ErrorBoundary>
    }

    return (
      <><Route path={`/`} render={() =>
           (<><Search submitFunc={this.searchSubmitFunc}/>
         {suggestionsBlock}</>)
        }/>
        {loading && <Spinner/>}
        {routes}</>);
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