import WeatherService from "../services/weather-service";

const initialState = {
  WeatherService: new WeatherService(),
  weatherForecasts: {
    daily: null
  },
  city: null
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {

    case `FETCH_FORECAST`:
      return {
        ...state,
        weatherForecasts: {
          ...action.payload
        }
      }
    case `FETCH_CITY`:
      return {
        ...state,
        city: action.payload
      }

    default:
      return state;
  }
}

export default reducer;