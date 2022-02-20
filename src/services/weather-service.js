
export default class WeatherService {

  #сoordinatesPath = `https://api.openweathermap.org/data/2.5/weather?appid=61fdf6f7410c8d947a85a69de8f6587d`;
  #weatherPath = `https://api.openweathermap.org/data/2.5/onecall?appid=61fdf6f7410c8d947a85a69de8f6587d&units=metric&lang=ru&exclude=minutely,hourly,alerts`;


  convertForecast = new class {

  // возвращает преобразованное время в мс в соответствии с timeZoneOffset
  #returnLocalTimeMs = (seconds, timeZoneOffsetSeconds) =>{
    let date = new Date(seconds * 1000)

    return (seconds * 1000) + (date.getTimezoneOffset() * 60 * 1000) + timeZoneOffsetSeconds * 1000;
  }

  #returnDetailedDate = (seconds, timeZoneOffsetSeconds) =>{

    let date;

    if (timeZoneOffsetSeconds){
      date = new Date(this.#returnLocalTimeMs(seconds, timeZoneOffsetSeconds));
    }
    else {
      date = new Date(seconds * 1000);
    }

    const shortMonthTemplates = {
      1: `янв`, 2: `фев`, 3: `марта`,
      4: `апр`, 5: `мая`, 6: `июня`,
      7: `июля`, 8: `авг`, 9: `сент`,
      10: `окт`, 11: `нояб`, 12: `дек`
    };

    const returnIntlDate = (options) => new Intl.DateTimeFormat(`ru`, options).format(date);

    // опции сформированы таким образом, чтобы месяц был в нужном падеже, а после его отделяем от дня
    const month = returnIntlDate({
      day: `numeric`,
      month: "long"
    }).match(/[а-яА-я]+$/gm).toString();
    let shortMonth = shortMonthTemplates[(date.getMonth() + 1)];

    // опция `2-digit` не работает для minute, поэтому вырезаем результат из полноценной даты
    const minutes = returnIntlDate({hour:`2-digit`, minute:`2-digit`}).slice(3);

    return{
      day: date.getDate(),
      month,
      shortMonth,
      weekday: returnIntlDate({weekday: `long`}),
      hours: returnIntlDate({hour: `2-digit`}),
      minutes
    }
  }

  // возвращает строку с температурой, при необходимости можно задать кол-во цифр после запятой
  #returnTemperature = (number, fractionDigits) =>{
    number = (fractionDigits) ? number.toFixed(fractionDigits) : Math.round(number);

    if (number > 0){
      return `+${number}°c`
    }
    else if(number < 0){
      return `−${String(number).slice(1)}°c`
    }
    return `${number}°c`
  }

// переводит значение давления над уровнем моря в мм рт. ст.
  #returnAtmospherePressure = (seaLevel) => Math.round(seaLevel / 1.36);

// возвращает направление ветра в зависимости от градуса
  #returnWindDirection = (deg) =>{
    if ((deg >= 337.5 && deg <= 360) || (deg >= 0 && deg < 22.5) ){
      return {full: `Северный`, short: `C`};
    }
    if (deg >= 22.5 && deg < 67.5){
      return {full: `Северо-восточный`, short: `CВ`};
    }
    if (deg >= 67.5 && deg < 112.5){
      return {full: `Восточный`, short: `В`};
    }
    if (deg >= 112.5 && deg < 157.5){
      return {full: `Юго-восточный`, short: `ЮВ`};
    }
    if (deg >= 157.5 && deg < 202.5){
      return {full: `Южный`, short: `Ю`};
    }
    if (deg >= 202.5 && deg < 247.5){
      return {full: `Юго-западный`, short: `ЮЗ`};
    }
    if (deg >= 247.5 && deg < 292.5){
      return {full: `Западный`, short: `З`};
    }
    if (deg >= 292.5 && deg < 337.5){
      return {full: `Северо-западный`, short: `CЗ`};
    }
  }

  // возвращает время дня в зависимости от времени восхода/заката
  #returnTimeOfDay = (currentTime, sunriseTime, sunsetTime, timeZoneOffsetSeconds) =>{

    // приводим все значения к единому формату
    currentTime = this.#returnLocalTimeMs(currentTime, timeZoneOffsetSeconds)
    sunriseTime = this.#returnLocalTimeMs(sunriseTime, timeZoneOffsetSeconds)
    sunsetTime = this.#returnLocalTimeMs(sunsetTime, timeZoneOffsetSeconds)

    if(currentTime >= sunriseTime && currentTime <= sunsetTime){
      return `day`;
    }
    return `night`;
  }

  // конвертирует полученный прогноз в необходимый для отображения вид
  #convertSingleForecast = (value, timezoneOffset) =>{
    let {dt, sunrise, sunset, feels_like, temp, weather, wind_speed, wind_deg, humidity, pressure} = value;

    let convertedTemp, convertedFeelingTemp;

    // в зависимости от типа прогноза, преобразуем данные необходимым образом
    if (typeof temp === `object` && typeof feels_like === `object`){
      convertedTemp = {
        morn: this.#returnTemperature(temp.morn),
        day: this.#returnTemperature(temp.day),
        night: this.#returnTemperature(temp.night),
      }
      convertedFeelingTemp = {
        morn: this.#returnTemperature(feels_like.morn),
        day: this.#returnTemperature(feels_like.day),
        night: this.#returnTemperature(feels_like.night),
      }
    }
    else if (typeof temp === `number` && typeof feels_like === `number`){
      convertedTemp = this.#returnTemperature(temp, 1);
      convertedFeelingTemp = this.#returnTemperature(feels_like);
    }

    return {
      date: this.#returnDetailedDate(dt, timezoneOffset),
      timeOfDay: this.#returnTimeOfDay(dt, sunrise, sunset, timezoneOffset),
      sunriseTime: this.#returnDetailedDate(sunrise, timezoneOffset),
      sunsetTime: this.#returnDetailedDate(sunset, timezoneOffset),
      temp: convertedTemp,
      feelingTemp: convertedFeelingTemp,
      description: weather[0].description,
      windSpeed: wind_speed.toFixed(1),
      windDirection: this.#returnWindDirection(wind_deg),
      pressure: this.#returnAtmospherePressure(pressure),
      humidity,
      weatherId: weather[0].id
    }
  }

  // конвертирует весь объект с прогнозами
  convertForecast = (weatherObj) =>{
    weatherObj.current = this.#convertSingleForecast(weatherObj.current, weatherObj.timezone_offset);
    weatherObj.daily = weatherObj.daily.map((value) => this.#convertSingleForecast(value, weatherObj.timezone_offset))
    return weatherObj;
  }
}().convertForecast;

  // метод для получения множества типов прогноза
  fetchOneCallForecast = async (city) => {
    const coord = await this.fetchCityCoordinates(city);
    if (coord){
      const path = this.#weatherPath + `&lat=${coord.lat}&lon=${coord.lon}`
      return fetch(path)
        .then((result) => result.json())
        .then((data) => this.convertForecast(data))
        .catch((err) => err);
    }
    return new Promise((r, reject)=> reject(`Данный город не найден`));
  }

  // метод для получения координат запрошенного города
  fetchCityCoordinates = (city) => (
    fetch(this.#сoordinatesPath + `&q=${city}`)
      .then((result) => result.json())
      .then((data) => data.coord)
      .catch((err) => err));
}