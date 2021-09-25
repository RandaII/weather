import React from "react";

import "./weather-card.scss";
import {returnDayAndMonth,returnTemperature} from "../../utils";
import WeatherImgCollections from "./img";

const WeatherCard = ({city, values}) =>{

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
              <p className="weather-card__month">{date.month}</p>
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
  })

  // return(
  //   <>
  //     <div className="weather-card">
  //       <div className="weather-card__row">
  //         <p className="weather-card__city">Мельбурн</p>
  //         <div className="weather-card__date">
  //           <p className="weather-card__day">16</p>
  //           <p className="weather-card__month">Сент</p>
  //         </div>
  //       </div>
  //       <div className="weather-card__row">
  //         <div>
  //           <p className="weather-card__temperature">+19°c</p>
  //           <p className="weather-card__temperature">+8°c</p>
  //         </div>
  //         <img src={day} alt="" className="weather-card__icon"/>
  //       </div>
  //       <span className="weather-card__description">Пасмурно, небольшой дождь</span>
  //     </div>
  //     </>
  // );
}

export default WeatherCard;