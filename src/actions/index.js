
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

export {
  fetchForecast,
  fetchCity
}