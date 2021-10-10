
const fetchForecast = (payload) =>{
  return {
    type: `FETCH_FORECAST`,
    payload
  }
}

const fetchCity = (payload) =>{
  return {
    type: `FETCH_CITY`,
    payload
  }
}

const setActiveWeatherTab = (payload) =>{
  return {
    type: `SET_ACTIVE_WEATHER_TAB`,
    payload
  }
}

export {
  fetchForecast,
  fetchCity,
  setActiveWeatherTab
}