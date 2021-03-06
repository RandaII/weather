import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSearchInput} from "../../actions";
import {withRouter} from "react-router-dom";
import {returnStructuredPath} from "../../utils";
import PropTypes from "prop-types";

import "./suggestions.scss";

const Suggestions = ({suggestionsArr, fetchSearchInput, history}) =>{

  const {parameter} = returnStructuredPath(history.location.pathname);

  // преобразуем массив городов в массив react элементов
  suggestionsArr = suggestionsArr.map(({city, country, region_with_type}, id) =>{

    // в случае, если в существующем url присутствует параметр, добавляем его в link
    let path = (parameter !== ``) ? `/${city}/${parameter}`: `/${city}/`;

    // по клику меняем inputStatus и отправляем значение city для search-input
    const clickFunc = () =>{
      fetchSearchInput({status: false, value: city});
    }

    return (
      <NavLink className="suggestion" to={path} data-suggestion key={id} exact onClick={clickFunc}>
        <span className="suggestion__city" data-suggestion>{city}</span> <span className="suggestion__region" data-suggestion>{`${region_with_type}, ${country}`}</span>
      </NavLink>
    );
  });

  return (<div className="suggestions" data-suggestions>{suggestionsArr}</div>);
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {fetchSearchInput}

Suggestions.propTypes = {
  suggestionsArr: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    region_with_type: PropTypes.string.isRequired,
  })),
  fetchSearchInput: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Suggestions));