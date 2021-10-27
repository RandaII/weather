import React from "react";
import {NavLink} from "react-router-dom";

import "./forecast-tabs.scss";

const ForecastTabs = ({city}) =>{
  return(
        <ul className="forecast-tabs">
          <li className="forecast-tab">
            <NavLink to={`/${city}/now`} exact>Сейчас</NavLink></li>
          <li className="forecast-tab">
            <NavLink to={`/${city}/`} exact>Сегодня</NavLink></li>
          <li className="forecast-tab">
            <NavLink to={`/${city}/2-day`} exact>Завтра</NavLink></li>
          <li className="forecast-tab"><NavLink to={`/${city}/week`}>7 дней</NavLink></li>
        </ul>
  );
}

export default ForecastTabs;