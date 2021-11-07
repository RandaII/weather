const returnLocalTimeMs = (seconds, timeZoneOffsetSeconds) =>{
  let date = new Date(seconds * 1000)

  return (seconds * 1000) +  (date.getTimezoneOffset() * 60 * 1000) + timeZoneOffsetSeconds * 1000;
}

const returnDetailedDate = (seconds, timeZoneOffsetSeconds) =>{

  let date;

  if (timeZoneOffsetSeconds){
    date = new Date(returnLocalTimeMs(seconds, timeZoneOffsetSeconds));
  }
  else {
    date = new Date(seconds * 1000);
  }

  let month;
  let shortMonth;
  let weekday;

  switch(date.getMonth() + 1){
    case 1:
      shortMonth = `янв`;
      month = `января`;
      break;
    case 2:
      shortMonth = `фев`;
      month = `февраля`;
      break;
    case 3:
      shortMonth = `марта`;
      month = `марта`;
      break;
    case 4:
      shortMonth = `апр`;
      month = `апреля`;
      break;
    case 5:
      shortMonth = `мая`;
      month = `мая`;
      break;
    case 6:
      shortMonth = `июня`;
      month = `июня`;
      break;
    case 7:
      shortMonth = `июля`;
      month = `июля`;
      break;
    case 8:
      shortMonth = `авг`;
      month = `августа`;
      break;
    case 9:
      shortMonth = `сент`;
      month = `сентября`;
      break;
    case 10:
      shortMonth = `окт`;
      month = `октября`;
      break;
    case 11:
      shortMonth = `нояб`;
      month = `ноября`;
      break;
    case 12:
      shortMonth = `дек`;
      month = `декабря`;
      break;
  }

  switch (date.getDay()) {
    case 0:
      weekday = `воскресение`;
      break;
    case 1:
      weekday = `понедельник`;
      break;
    case 2:
      weekday = `вторник`;
      break;
    case 3:
      weekday = `среда`;
      break;
    case 4:
      weekday = `четверг`;
      break;
    case 5:
      weekday = `пятница`;
      break;
    case 6:
      weekday = `суббота`;
      break;
  }

  const minutes = (date.getMinutes() < 10) ? `0` + date.getMinutes() : date.getMinutes();
  const hours = (date.getHours() < 10) ? `0` + date.getHours() : date.getHours();

  return{
    day: date.getDate(),
    month,
    shortMonth,
    weekday,
    hours,
    minutes
  }
}

const returnTemperature = (number, fractionDigits) =>{
  number = (fractionDigits) ? number.toFixed(fractionDigits) : Math.round(number);

  if (number > 0){
    return `+${number}°c`
  }
  else if(number < 0){
    return `−${String(number).slice(1)}°c`
  }
  else {
    return `${number}°c`
  }
}

const returnAtmospherePressure = (seaLevel) => Math.round(seaLevel / 1.36);

const returnWindDirection = (deg) =>{
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

const returnTimeOfDay = (currentTime, sunriseTime, sunsetTime, timeZoneOffsetSeconds) =>{

  currentTime = returnLocalTimeMs(currentTime, timeZoneOffsetSeconds)
  sunriseTime = returnLocalTimeMs(sunriseTime, timeZoneOffsetSeconds)
  sunsetTime = returnLocalTimeMs(sunsetTime, timeZoneOffsetSeconds)

  if(currentTime >= sunriseTime && currentTime <= sunsetTime){
    return `day`;
  }
  else{
    return `night`;
  }
}

const returnBackground = (id, timesOfDay) =>{

  let bgcPath = ``;

  // cloud weather
  if (id >= 801 && id <=804){
    bgcPath = {
      day: `d_c.jpg`,
      night: `n_c.jpg`
    } ;
  }

  //rain weather
  if (id >= 500 && id <=531){
    bgcPath = {
      day: `d_r.webp`,
      night: `n_r.jpg`
    } ;
  }

  // snowy weather
  if (id >= 600 && id <=622){
    bgcPath = {
      day: `d_s.jpg`,
      night: `n_s.jpg`
    } ;
  }

  //clear weather
  if (id === 800){
    bgcPath = {
      day: `d.jpg`,
      night: `n.png`
    } ;
  }

  return `url(/backgrounds/${timesOfDay}/${bgcPath[timesOfDay]})`;
}

const returnConvertedWeatherInfo = (value, timezoneOffset) =>{
  let {dt, sunrise, sunset, feels_like, temp, weather, wind_speed, wind_deg, humidity, pressure} = value;

  let convertedTemp;
  let convertedFeelingTemp;

  if (typeof temp === `object` && typeof feels_like === `object`){
    convertedTemp = {
      morn: returnTemperature(temp.morn),
      day: returnTemperature(temp.day),
      night: returnTemperature(temp.night),
    }
    convertedFeelingTemp = {
      morn: returnTemperature(feels_like.morn),
      day: returnTemperature(feels_like.day),
      night: returnTemperature(feels_like.night),
    }
  }
  else if (typeof temp === `number` && typeof feels_like === `number`){
    convertedTemp = returnTemperature(temp, 1);
    convertedFeelingTemp = returnTemperature(feels_like);
  }

  return {
    date: returnDetailedDate(dt, timezoneOffset),
    timeOfDay: returnTimeOfDay(dt, sunrise, sunset, timezoneOffset),
    sunriseTime: returnDetailedDate(sunrise, timezoneOffset),
    sunsetTime: returnDetailedDate(sunset, timezoneOffset),
    temp: convertedTemp,
    feelingTemp: convertedFeelingTemp,
    description: weather[0].description,
    windSpeed: wind_speed.toFixed(1),
    windDirection: returnWindDirection(wind_deg),
    pressure: returnAtmospherePressure(pressure),
    humidity,
    weatherId: weather[0].id
  }
}

const returnTabId = (activeTabId) => Number(activeTabId.slice(0,1)) - 1;

const returnStructuredPath = (path) => {
  const regExp = /^(\/(?<structuredPathCity>.+)\/)(?<structuredPathParameter>[a-z0-9-]+)|^\/(?<singleCity>[^\/]+)\/?/gm;
  // const regExp = /^(\/(?<structuredPathCity>[а-яА-Яa-zA-Z-]+)\/)(?<structuredPathParameter>[a-z0-9-]+)|^\/(?<singleCity>[а-яА-Яa-zA-Z-]+)\/?/gm;
  let result = [...path.matchAll(regExp)];

  if (result.length > 0) {
    const {structuredPathCity, structuredPathParameter, singleCity} = result[0].groups;

    if (structuredPathCity && structuredPathParameter) {
      return {
        city: structuredPathCity,
        parameter: structuredPathParameter
      }
    }
    if (singleCity) {
      return {
        city: singleCity,
        parameter: ``
      };
    }
  }
  return {
    city: ``,
    parameter: ``
  };
}

export {
  returnDetailedDate,
  returnTemperature,
  returnAtmospherePressure,
  returnWindDirection,
  returnTimeOfDay,
  returnBackground,
  returnConvertedWeatherInfo,
  returnLocalTimeMs,
  returnTabId,
  returnStructuredPath
}