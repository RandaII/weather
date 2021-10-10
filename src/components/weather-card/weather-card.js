import React from "react";
import {connect} from "react-redux";

import "./weather-card.scss";
import {
  returnBackground,
  returnConvertedWeatherInfo, returnTabId
} from "../../utils";
import {WeatherImgCollections, WeatherIcons} from "./img";

const WeatherCard = ({template, weatherForecasts, city, dayId}) => {

  const {current, daily, timezone_offset} = weatherForecasts;

  let selectedTemplate;

  switch (template) {
    case `current`:
      selectedTemplate = currentTemplate(current, city, timezone_offset);
      break;
    case `oneDay`:
      dayId = returnTabId(dayId);
      selectedTemplate =  oneDayTemplate(daily[dayId], city, timezone_offset);
      break;
    case `sevenDays`:
      selectedTemplate = sevenDaysTemplate(daily, city, timezone_offset);
      break;
  }
  return (<section className="weather-cards">{selectedTemplate}</section>)
  }

const currentTemplate = (value, city, timezoneOffset) => {

  const {date, timeOfDay, sunriseTime, sunsetTime, temp, feelingTemp, description, windSpeed, windDirection, pressure, humidity, weatherId} = returnConvertedWeatherInfo(value, timezoneOffset);

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

const oneDayTemplate = (value, city, timezoneOffset) => {

  const {date, temp, feelingTemp, description, weatherId, windSpeed, windDirection, humidity, pressure} = returnConvertedWeatherInfo(value, timezoneOffset);

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

const sevenDaysTemplate = (values, city, timezoneOffset) => {
  return values.map((value, id) => {

    const {date, temp, description, weatherId} = returnConvertedWeatherInfo(value, timezoneOffset);

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
  });
}

const mapStateToProps = ({weatherForecasts, city}) => {
  return {weatherForecasts, city};
}

export default connect(mapStateToProps)(WeatherCard);