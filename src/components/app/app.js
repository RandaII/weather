import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchForecast, fetchSuggestions, fetchSearchInput} from "../../actions";
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

  state = {
    loading: false,
    timer: null
  };

  // данные для forecastTabs
  forecastTabData = [
    {id: 0, title: `Сейчас`, url: `now`},
    {id: 1, title: `Сегодня`, url: ``},
    {id: 2, title: `Завтра`, url: `2-day`},
    {id: 3, title: `7 дней`, url: `week`},
  ];

  // отправить в store прогноз и текущий город
  sendForecast = async (city) =>{

    this.setState({loading:true});

    await this.props.fetchOneCallForecast(city)
      .then((forecast) => this.props.fetchForecast({forecast, city, cityNotFound: false}))
      .catch(() => this.props.fetchForecast({forecast:{}, city, cityNotFound: true}))

    this.setState({loading:false});
  }

  // при submit пушим значение в url
  searchSubmit = async (city) => {
    const currentPath = this.props.history.location.pathname;
    const {parameter: pathRest} = returnStructuredPath(currentPath);
    this.props.history.push(`/${city}/${pathRest}`);
  }

  // отправить в store city suggestions
  sendSuggestions = async (string) => {
    let suggestions = await this.props.fetchCityPrompt(string);
    this.props.fetchSuggestions(suggestions);
  }

  // handler для смены статуса активности search-input (при false не будет показан блок suggestions)
  inputFocus = ({target:{dataset}}) =>{
    if (!dataset.suggestion && !dataset.search && this.props.searchInput.status){
      this.props.fetchSearchInput({status:false});
    }
  }

  // после монтирования проверяем url и назначаем обработчик
  componentDidMount() {
    const {city: pathCity} = returnStructuredPath(this.props.location.pathname);
    document.addEventListener(`click`, this.inputFocus);

    // если в url присутствует город, получаем прогноз и отправляем его в store
    if (pathCity) {this.sendForecast(pathCity);}
  }

  componentDidUpdate(prevProps) {
    const {city: pathCity} = returnStructuredPath(this.props.location.pathname);
    const {city: prevPathCity} = returnStructuredPath(prevProps.location.pathname);

    // в случае изменения города в url получаем и отправляем в store обновленный прогноз
    if (pathCity && pathCity !== prevPathCity) {
      this.sendForecast(pathCity);
    }

    // при вводе в input ставим таймер на отправку в store найденных городов
    if (prevProps.searchInput.value !== this.props.searchInput.value) {
      clearTimeout(this.state.timer);
      this.setState({timer: setTimeout(() =>
        this.sendSuggestions(this.props.searchInput.value),300)});
    }
  }

  render() {

    const {city, weatherForecasts: {daily, current}, suggestions, searchInput:{status: searchInputStatus}, cityNotFound} = this.props;
    const {loading} = this.state;

    let routes, suggestionsBlock;

    if (daily && current && city && !cityNotFound && !loading) {
      routes = (
        <ErrorBoundary>
          <Route render={() =>(
            <ForecastTabs city={city}>{this.forecastTabData}</ForecastTabs>)}/>

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
      routes = <Notification>{`Данный город не найден`}</Notification>;
    }

    if (suggestions && searchInputStatus){
      suggestionsBlock = <ErrorBoundary emptyComponent={true}><Suggestions suggestionsArr={suggestions}/></ErrorBoundary>
    }

    return (<>
      <Route path={`/`} render={() =>
        (<><Search submitFunc={this.searchSubmit}/>
         {suggestionsBlock}</>)
      }/>
      {loading && <Spinner/>}
      {routes}</>);
  }
}

App.propTypes = {
  fetchCityPrompt: PropTypes.func.isRequired,
  fetchOneCallForecast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchForecast: PropTypes.func.isRequired,
  fetchSearchInput: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  cityNotFound: PropTypes.bool.isRequired ,
  searchInput: PropTypes.shape({
    value: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired
  }).isRequired,
  weatherForecasts: PropTypes.shape({
    current: PropTypes.object,
    daily: PropTypes.array
  }).isRequired}

const mapDispatchToProps ={
    fetchForecast,
    fetchSuggestions,
    fetchSearchInput
}

const mapStateToProps = (state) => ({...state});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));