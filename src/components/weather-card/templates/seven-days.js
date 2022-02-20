import {WeatherImgCollections} from "../img";
import React from "react";

// шаблон прогноза на неделю
const sevenDaysTemplate = (values, city) =>(
  values.map((value, id) => {

    const {date, temp, description, weatherId} = value;

    // получаем изображение из коллекции
    const img = WeatherImgCollections[`id${weatherId}`];

    return (
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
            <p className="weather-card__temperature">{temp.day}</p>
            <p className="weather-card__temperature">{temp.night}</p>
          </div>
          <img src={img} alt={description} className="weather-card__icon"/>
        </div>
        <span className="weather-card__description">{description}</span>
      </div>
    );
  }));

export {sevenDaysTemplate};