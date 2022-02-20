// payload сл структуры: {city, cityNotFound, forecast}
const fetchForecast = (payload) =>({
    type: `FETCH_FORECAST`,
    payload
});
// payload сл структуры: [{city, country, region_with_type}...]
const fetchSuggestions = (payload) =>({
    type: `FETCH_SUGGESTIONS`,
    payload
});

// payload сл структуры: {value, status}, поля не обязательные
const fetchSearchInput = (payload) =>({
    type: `FETCH_SEARCH_INPUT`,
    payload
});

export {
  fetchForecast,
  fetchSuggestions,
  fetchSearchInput,
}