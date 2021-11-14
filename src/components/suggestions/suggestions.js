import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {fetchSearchInputStatus, fetchSearchInputValue} from "../../actions";
import {withRouter} from "react-router-dom";
import {returnStructuredPath} from "../../utils";
import {bindActionCreators} from "redux";

import "./suggestions.scss";

const Suggestions = ({suggestionsArr, fetchSearchInputStatus, fetchSearchInputValue, history}) =>{

  const {parameter} = returnStructuredPath(history.location.pathname);

  suggestionsArr = suggestionsArr.map(({city, country, region_with_type}, id) =>{

    let path = (parameter !== ``) ? `/${city}/${parameter}`: `/${city}/`;

    const clickFunc = () =>{
      fetchSearchInputStatus(false);
      fetchSearchInputValue(city);
    }

    return (
      <NavLink className="suggestion" to={path} data-suggestion key={id} exact onClick={clickFunc}>
        <span className="suggestion__city" data-suggestion>{city}</span> <span className="suggestion__region" data-suggestion>{`${region_with_type}, ${country}`}</span>
      </NavLink>
    );
  });

  return (<div className="suggestions" data-suggestions>{suggestionsArr}</div>);
}

const mapStateToProps = (state) =>{ return {} }

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    fetchSearchInputStatus,
    fetchSearchInputValue
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Suggestions));