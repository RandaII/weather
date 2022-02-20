import React from "react";
import {WeatherIcons, WeatherImgCollections} from "../img";

// шаблон прогноза на день
const oneDayTemplate = (value, city) => {

  // преобразуем данные полученные от API
  const {date, temp, feelingTemp, description, weatherId, windSpeed, windDirection, humidity, pressure} = value;

  return (
    <div className="weather-card--extended">

      <div className="weather-card--extended__row">
        <span className="weather-card--extended__city">{city}</span>
        <p className="weather-card--extended__date">{`${date.weekday}`} <br/> {`${date.day} ${date.month}`}</p>
      </div>

      <div className="weather-card--extended__row pd">

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__time-of-day">Утром</p>
          <p className="weather-card--extended__temperature">{temp.morn}</p>
        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__time-of-day">Днем</p>
          <p className="weather-card--extended__temperature">{temp.day}</p>
        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__time-of-day">Ночью</p>
          <p className="weather-card--extended__temperature">{temp.night}</p>
        </div>

      </div>

      <div className="weather-card--extended__row">
        <p className="weather-card--extended__feelings">Ощущается как:</p>
      </div>

      <div className="weather-card--extended__row pd">

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__temperature">{feelingTemp.morn}</p>
        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__temperature">{feelingTemp.day}</p>

        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__temperature">{feelingTemp.night}</p>
        </div>

      </div>

      <div className="weather-card--extended__facts">

        <div className="weather-card--extended__row jcl">
          <img src={WeatherImgCollections[`id${weatherId}`]} alt=""
               className="weather-card--extended__characteristic-icon"/>
          <p className="weather-card--extended__fact">{description}</p>
        </div>

        <div className="weather-card--extended__row jcl">
          <img src={WeatherIcons.wind} alt="" className="weather-card--extended__characteristic-icon"/>
          <p className="weather-card--extended__fact">Скорость ветра {windSpeed} м/с {windDirection.short}</p>
        </div>
        <div className="weather-card--extended__row jcl">
          <img src={WeatherIcons.humidity} alt="" className="weather-card--extended__characteristic-icon"/>
          <p className="weather-card--extended__fact">Влажность {humidity}%</p>
        </div>
        <div className="weather-card--extended__row jcl">
          <img src={WeatherIcons.pressure} alt="" className="weather-card--extended__characteristic-icon"/>
          <p className="weather-card--extended__fact">Давление {pressure} мм рт. ст.</p>
        </div>

      </div>

    </div>
  );
}

export {oneDayTemplate};