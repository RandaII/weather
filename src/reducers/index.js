
const initialState = {
  weatherForecasts: {},
  isLoading: false,
  city: ``,
  searchInput:{
    value:``,
    status: false
  },
  cityNotFound: false,
  suggestions:[]
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {

    case `SET_LOADING_STATUS`:
      return {
        ...state,
        isLoading: action.payload
      }

    // получение прогнозов (daily, current), города, и статуса, найден ли город
    case `SET_FORECAST`:
      return {
        ...state,
        weatherForecasts: {
          ...action.payload.forecast
        },
        city: action.payload.city,
        cityNotFound: action.payload.cityNotFound
      }
    // получение массива поисковых предложений
    case `FETCH_SUGGESTIONS`:
      return {
        ...state,
        suggestions: action.payload
      }
    // получение информации по поисковой строке (статус и значение)
    case `FETCH_SEARCH_INPUT`:
      return {
        ...state,
        searchInput:{
          ...state.searchInput,
          ...action.payload
        }
      }
    default:
      return state;
  }
}

export default reducer;