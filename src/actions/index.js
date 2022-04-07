import WeatherService from "../services/weather-service";
import CityService from "../services/city-service";

const {fetchCityPrompt} = new CityService();
const {fetchOneCallForecast} = new WeatherService();

// payload сл структуры: {city, cityNotFound, forecast}
const setForecast = (payload) =>({
    type: `SET_FORECAST`,
    payload
});

// задание loading статуса, bool
const setLoadingStatus = (payload) =>({
  type: `SET_LOADING_STATUS`,
  payload
});

// payload сл структуры: {value, status}, поля не обязательные
const fetchSearchInput = (payload) =>({
    type: `FETCH_SEARCH_INPUT`,
    payload
});

// получение и отправка в store погоды
const fetchForecast = (city) => (dispatch) =>{

  dispatch(setLoadingStatus(true));

  fetchOneCallForecast(city)
    .then((forecast) => dispatch(setForecast({
        forecast,
        city,
        cityNotFound: false
      }))
    )
    .catch(() => dispatch(setForecast({
        forecast: {},
        city,
        cityNotFound: true
      }))
    )
    .finally(() => dispatch(setLoadingStatus(false)));
};

// payload сл структуры: [{city, country, region_with_type}...]
const fetchSuggestions = (string) => (dispatch) =>{
  fetchCityPrompt(string)
    .then((payload) => dispatch({
      type: `FETCH_SUGGESTIONS`,
      payload
    }))
};

export {
  fetchSuggestions,
  fetchSearchInput,
  fetchForecast
}