import React from "react";
import {connect} from "react-redux";
import {returnTabId} from "../../utils";
import PropTypes from "prop-types";
import {currentTemplate, oneDayTemplate, sevenDaysTemplate} from "./templates";

import "./weather-card.scss";

const WeatherCard = ({template, weatherForecasts, city, dayId}) => {
  // в зависимости от шаблона по разному формируем карточку
  const {current, daily} = weatherForecasts;

  let selectedTemplate;

  switch (template) {
    case `current`:
      selectedTemplate = currentTemplate(current, city);
      break;
    case `oneDay`:
      dayId = returnTabId(dayId);
      selectedTemplate =  oneDayTemplate(daily[dayId], city);
      break;
    case `sevenDays`:
      selectedTemplate = sevenDaysTemplate(daily, city);
      break;
  }
  return (<section className="weather-cards">{selectedTemplate}</section>)
  }

const mapStateToProps = ({weatherForecasts:{current, daily}, city}) => ({
  weatherForecasts:{current, daily},
  city
});

WeatherCard.propTypes = {
  template: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  dayId: PropTypes.string,
  weatherForecasts: PropTypes.shape({
    current: PropTypes.object.isRequired,
    daily: PropTypes.array.isRequired,
  }).isRequired
}

export default connect(mapStateToProps)(WeatherCard);