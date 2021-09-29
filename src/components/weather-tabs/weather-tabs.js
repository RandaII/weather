import React from "react";
import {returnDayAndMonth, returnTemperature} from "../../utils";
import {WeatherImgCollections} from "../weather-card/img";

import "./weather-tabs.scss";

const WeatherTabs = ({values}) =>{

  const threeDays = values.map(({dt, temp, weather}, id) => {

    const date = returnDayAndMonth(dt);
    const dayTemp = returnTemperature(temp.day);
    const nightTemp = returnTemperature(temp.night);
    const description = weather[0].description;

    const img = WeatherImgCollections[`id${weather[0].id}`];

    return (
      <div className="weather-tab" key={id}>
        <div className="weather-tab__row">
          <p className="weather-tab__date">{date.day} {date.month}</p>
        </div>
        <div className="weather-tab__row">
          <div>
            <p className="weather-tab__temperature">{dayTemp}</p>
            <p className="weather-tab__temperature">{nightTemp}</p>
          </div>
          <img src={img} alt={description} className="weather-tab__icon"/>
        </div>
      </div>
    );
  });

  return (<section className="weather-tabs">{threeDays}</section>
  );
}

export default WeatherTabs;