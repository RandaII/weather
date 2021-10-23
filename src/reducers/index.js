import WeatherService from "../services/weather-service";
import CityService from "../services/city-service";

const initialState = {
  WeatherService: new WeatherService(),
  CityService: new CityService(),
  weatherForecasts: {
    daily: null
  },
  city: `Барнаул`,
  searchInput: ``,
  searchInputStatus: false
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {

    case `FETCH_FORECAST`:
      return {
        ...state,
        weatherForecasts: {
          ...state.weatherForecasts,
          ...action.payload
        }
      }
    case `FETCH_CITY`:
      return {
        ...state,
        city: action.payload
      }
    case `FETCH_SUGGESTIONS`:
      return {
        ...state,
        suggestions: action.payload
      }
    case `FETCH_SEARCH_INPUT_VALUE`:
      return {
        ...state,
        searchInput: action.payload
      }
    case `FETCH_SEARCH_INPUT_STATUS`:
      return {
        ...state,
        searchInputStatus: action.payload
      }

    default:
      return state;
  }
}

export default reducer;