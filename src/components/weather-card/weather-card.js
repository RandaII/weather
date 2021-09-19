import React from "react";

import "./weather-card.scss";
import day from "./img/d.svg";
import cloud from "./img/d_c1.svg";

const WeatherCard = () =>{
  return(
    <>
      <div className="weather-card">
        <div className="weather-card__row">
          <p className="weather-card__city">Мельбурн</p>
          <div className="weather-card__date">
            <p className="weather-card__day">16</p>
            <p className="weather-card__month">Сент</p>
          </div>
        </div>
        <div className="weather-card__row">
          <p className="weather-card__temperature">+19°c</p>
          <img src={day} alt="" className="weather-card__icon"/>
        </div>
        <div className="weather-card__row">
          <p className="weather-card__temperature">+8°c</p>
          <img src={cloud} alt="" className="weather-card__icon"/>
        </div>
        <span className="weather-card__description">Пасмурно, небольшой дождь</span>
      </div>
      </>

  );
}

export default WeatherCard;