import React from "react";
import {returnConvertedWeatherInfo} from "../../utils";
import {WeatherImgCollections} from "../weather-card/img";
import {NavLink} from "react-router-dom";
import {returnTabId} from "../../utils";
import {connect} from "react-redux";

import "./weather-tabs.scss";

const WeatherTabs = ({daily, city, activeTabId}) =>{

  let start;
  let end;
  let componentsArr = [];

  if (activeTabId){

    const tabId = returnTabId(activeTabId);

    if (tabId > 0 && tabId < daily.length - 1){
      start = tabId - 1;
      end = tabId + 1;
    }

    else if (tabId == daily.length - 1){
      start = tabId - 2;
      end = tabId;
    }
  }
  else {
    start = 0;
    end = 2;
  }

  for (let i = start; i <= end; i++){

    const {date, temp:{day, night}, description, weatherId } = returnConvertedWeatherInfo(daily[i]);

    let NavLinkPath;

    if (i === 0){
      NavLinkPath = `/${city}/`;
    }
    else {
      NavLinkPath = `/${city}/${i + 1}-day`;
    }

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

export default connect(mapStateToProps)(WeatherTabs);