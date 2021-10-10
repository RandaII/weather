import WeatherService from "../services/weather-service";

const initialState = {
  WeatherService: new WeatherService(),
  weatherForecasts: {
    daily: null
  },
  city: `Барнаул`,
  activeWeatherTab: null
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
    case  `SET_ACTIVE_WEATHER_TAB`:
      return {
        ...state,
        activeWeatherTab: action.payload
      }

    default:
      return state;
  }
}

export default reducer;