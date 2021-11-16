import React from "react";
import {returnConvertedWeatherInfo, returnTabId} from "../../utils";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

import {WeatherImgCollections} from "../weather-card/img";
import "./weather-tabs.scss";

const WeatherTabs = ({daily, city, activeTabId}) =>{

  let start, end, componentsArr = [];

  // в зависимости от номера активного таба, получаем нумерацию предыдущего и последующего таба
  if (activeTabId){

    const tabId = returnTabId(activeTabId);

    if (tabId > 0 && tabId < daily.length - 1){
      start = tabId - 1;
      end = tabId + 1;
    }

    else if (tabId === daily.length - 1){
      start = tabId - 2;
      end = tabId;
    }
  }
  else {
    start = 0;
    end = 2;
  }

  // составляем массив react элементов
  for (let i = start; i <= end; i++){

    const {date, temp:{day, night}, description, weatherId } = returnConvertedWeatherInfo(daily[i]);

    let NavLinkPath = (i === 0) ? `/${city}/` : `/${city}/${i + 1}-day`;

    const img = WeatherImgCollections[`id${weatherId}`];

    let component = (
      <li key={i} className="weather-tab__wrap">
        <NavLink to={NavLinkPath} className="weather-tab" exact>
          <div className="weather-tab__row">
            <p className="weather-tab__date">{date.day} {date.month}</p>
          </div>
          <div className="weather-tab__row">
            <div>
              <p className="weather-tab__temperature">{day}</p>
              <p className="weather-tab__temperature">{night}</p>
            </div>
            <img src={img} alt={description} className="weather-tab__icon"/>
          </div>
        </NavLink>
      </li>
    );
    componentsArr.push(component)
  }

  return (<ul className="weather-tabs">{componentsArr}</ul>);
}

const mapStateToProps = ({city, weatherForecasts:{daily}}) =>{
  return{city, daily};
}

WeatherTabs.propTypes = {
  activeTabId : PropTypes.string,
  city : PropTypes.string.isRequired,
  daily : PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps)(WeatherTabs);