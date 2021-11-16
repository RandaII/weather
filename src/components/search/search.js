import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchSearchInputValue, fetchSearchInputStatus} from "../../actions";
import PropTypes from "prop-types";

import "./search.scss";

const Search = ({submitFunc, searchInput, fetchSearchInputValue, fetchSearchInputStatus}) =>{

  // отправляем в store значение input
  const onchange = ({target:{value}}) => fetchSearchInputValue(value);

  // при фокусе input сменяем в store inputStatus
  const onFocus = () => fetchSearchInputStatus(true);

  // при событии форматируем строку, отправляем в store, и меняем url в соответствии со строкой
  onsubmit = (evt) =>{
    evt.preventDefault();
    if (searchInput){
      searchInput = searchInput[0].toUpperCase() + searchInput.slice(1);
      fetchSearchInputValue(searchInput);
      submitFunc(searchInput);
    }
  }

  return(
    <div className="search">
      <form className="search__form">
        <input type="text" className="search__input" autoFocus placeholder="Введите город" onChange={onchange} value={searchInput}
               onFocus={onFocus} data-search/>
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

Search.propTypes = {
  searchInput: PropTypes.string.isRequired,
  submitFunc: PropTypes.func.isRequired,
  fetchSearchInputValue: PropTypes.func.isRequired,
  fetchSearchInputStatus: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);