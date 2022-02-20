import {returnBackground} from "../../../utils";
import React from "react";

// шаблон прогноза для текущей погоды
const currentTemplate = (value, city) => {

  const {date, timeOfDay, sunriseTime, sunsetTime, temp, feelingTemp, description, windSpeed, windDirection, pressure, humidity, weatherId} = value;

  // получаем путь для bgc
  const backgroundStyle = {
    backgroundImage: returnBackground(weatherId, timeOfDay)
  };

  return (
    <div className="weather-card--current" style={backgroundStyle}>

      <p className="weather-card--current__city">{city}</p>
      <p className="weather-card--current__date">{`${date.day} ${date.month}, ${date.hours}:${date.minutes}`}</p>
      <div className="weather-card--current__row">
        <span className="weather-card--current__sunrise">{`восход ${sunriseTime.hours}:${sunriseTime.minutes}`}</span>
        <span className="weather-card--current__temperature">{temp}</span>
        <span className="weather-card--current__sunset">{`закат ${sunsetTime.hours}:${sunsetTime.minutes}`}</span>
      </div>
      <p className="weather-card--current__feeling">по ощущению {feelingTemp}</p>
      <p className="weather-card--current__description">{description}</p>

      <div className="weather-card--current__row">
        <div className="weather-card--current__fact">
          <div className="weather-card--current__icon wind"></div>
          <span>{windSpeed} м/с, {windDirection.short}</span>
        </div>
        <div className="weather-card--current__fact">
          <div className="weather-card--current__icon humidity"></div>
          <span>{humidity}%</span>
        </div>
        <div className="weather-card--current__fact">
          <div className="weather-card--current__icon pressure"></div>
          <span>{pressure} мм рт. ст.</span>
        </div>
      </div>

    </div>
  );
}

export {currentTemplate};