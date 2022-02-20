import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

import "./forecast-tabs.scss";

// компонент переключатель видов прогноза
const ForecastTabs = ({city, children}) =>(
  <ul className="forecast-tabs">
    {children.map(({id, title, url}) =>
      <li className="forecast-tab" key={id}><NavLink to={`/${city}/${url}`} exact>{title}</NavLink></li>
    )}
  </ul>);

ForecastTabs.propTypes = {
  city: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ForecastTabs;