import React from "react";
import {connect} from "react-redux";

import "./search.scss";
import {bindActionCreators} from "redux";
import {fetchSearchInputValue, fetchSearchInputStatus} from "../../actions";

const Search = ({submitFunc, changeFunc, searchInput, fetchSearchInputValue, fetchSearchInputStatus}) =>{

  onchange = ({target:{value}}) => {
    fetchSearchInputValue(value)
    changeFunc(value);
  };

  onsubmit = (evt) =>{
    evt.preventDefault();
    if (searchInput){
      submitFunc(searchInput);
    }
  }

  const onFocus = () =>{
    fetchSearchInputStatus(true);
  }

  return(
    <div className="search">
      <form className="search__form">
        <input type="text" className="search__input" autoFocus placeholder="Введите город" onChange={onchange} value={searchInput}
               onFocus={onFocus} data-search
        />
        <button className="search__button" type="submit" onSubmit={onsubmit} data-search>Поиск</button>
      </form>
    </div>
  );
}

const mapStateToProps = ({searchInput}) =>{
  return {searchInput};
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    fetchSearchInputValue,
    fetchSearchInputStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);