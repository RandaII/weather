
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

const fetchSuggestions = (payload) =>{
  return {
    type: `FETCH_SUGGESTIONS`,
    payload
  }
}
const fetchSearchInputValue = (payload) =>{
  return {
    type: `FETCH_SEARCH_INPUT_VALUE`,
    payload
  }
}

const fetchSearchInputStatus = (payload) =>{
  return {
    type: `FETCH_SEARCH_INPUT_STATUS`,
    payload
  }
}

export {
  fetchForecast,
  fetchCity,
  fetchSuggestions,
  fetchSearchInputValue,
  fetchSearchInputStatus
}