import React from "react";

import "./weather-card.scss";
import {returnDayAndMonth, returnTemperature,returnAtmospherePressure} from "../../utils";
import {WeatherImgCollections, WeatherIcons} from "./img";

const WeatherCard = ({city, values}) => {
  return (<>{oneDayTemplate(values, city)}</>);
}

const oneDayTemplate = (values, city) =>{

  const testValue = values[0];
  const date = returnDayAndMonth(testValue.dt);
  const morning = returnTemperature(testValue.temp.morn)
  const day = returnTemperature(testValue.temp.day)
  const night = returnTemperature(testValue.temp.night)
  const feelMorning = returnTemperature(testValue.feels_like.morn);
  const feelDay = returnTemperature(testValue.feels_like.day);
  const feelNight = returnTemperature(testValue.feels_like.night);
  const description = testValue.weather[0].description;
  const iconId = testValue.weather[0].id
  const windSpeed = testValue.wind_speed.toFixed(1);
  const humidity = testValue.humidity;
  const pressure = returnAtmospherePressure(testValue.pressure);

  return (
    <div className="weather-card--extended">

      <div className="weather-card--extended__row">
        <span className="weather-card--extended__city">{city}</span>
        <p className="weather-card--extended__date">{`${date.weekday}`} <br/> {`${date.day} ${date.month}`}</p>
      </div>

      <div className="weather-card--extended__row pd">

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__time-of-day">Утром</p>
          <p className="weather-card--extended__temperature">{morning}</p>
        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__time-of-day">Днем</p>
          <p className="weather-card--extended__temperature">{day}</p>
        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__time-of-day">Ночью</p>
          <p className="weather-card--extended__temperature">{night}</p>
        </div>

      </div>

      <div className="weather-card--extended__row">
        <p className="weather-card--extended__feelings">Ощущается как:</p>
      </div>

      <div className="weather-card--extended__row pd">

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__temperature">{feelMorning}</p>
        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__temperature">{feelDay}</p>

        </div>

        <div className="weather-card--extended__row-item">
          <p className="weather-card--extended__temperature">{feelNight}</p>
        </div>

      </div>

      <div className="weather-card--extended__facts">

        <div className="weather-card--extended__row jcl">
          <img src={WeatherImgCollections[`id${iconId}`]} alt="" className="weather-card--extended__characteristic-icon"/>
          <p className="weather-card--extended__fact">{description}</p>
        </div>

        <div className="weather-card--extended__row jcl">
          <img src={WeatherIcons.wind} alt="" className="weather-card--extended__characteristic-icon"/>
          <p className="weather-card--extended__fact">Скорость ветра {windSpeed} м/с</p>
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

const sevenDaysTemplate = (values, city) =>{

  return values.map(({dt, temp, weather}, id) =>{
    const date = returnDayAndMonth(dt);
    const dayTemp = returnTemperature(temp.day);
    const nightTemp = returnTemperature(temp.night);
    const description = weather[0].description;

    const img = WeatherImgCollections[`id${weather[0].id}`];

    return(
      <div className="weather-card" key={id}>
        <div className="weather-card__row">
          <p className="weather-card__city">{city}</p>
          <div className="weather-card__date">
            <p className="weather-card__day">{date.day}</p>
            <p className="weather-card__month">{date.shortMonth}</p>
          </div>
        </div>
        <div className="weather-card__row">
          <div>
            <p className="weather-card__temperature">{dayTemp}</p>
            <p className="weather-card__temperature">{nightTemp}</p>
          </div>
          <img src={img} alt={description} className="weather-card__icon"/>
        </div>
        <span className="weather-card__description">{description}</span>
      </div>
    );
  });
}

export default WeatherCard;