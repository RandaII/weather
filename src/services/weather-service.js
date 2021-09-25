
export default class WeatherService {

  currentWeatherPath = `https://api.openweathermap.org/data/2.5/weather?appid=61fdf6f7410c8d947a85a69de8f6587d`;
  weatherPath = `https://api.openweathermap.org/data/2.5/onecall?appid=61fdf6f7410c8d947a85a69de8f6587d&units=metric&lang=ru`;

   fetchForecast = async (city, forecastType) =>{
    const coord = await this.fetchCityCoordinates(city);
    const path = this.weatherPath + `&lat=${coord.lat}&lon=${coord.lon}`
    return await fetch(path)
      .then((result) => result.json())
      .then((data) => data[forecastType]);
  }

  fetchCityCoordinates = async (city) =>{
    return await fetch(this.currentWeatherPath + `&q=${city}`)
      .then((result) => result.json())
      .then((data) => data.coord)
  }

}