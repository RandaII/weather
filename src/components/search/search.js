import React from "react";
import {connect} from "react-redux";
import {fetchSearchInput} from "../../actions";
import PropTypes from "prop-types";

import "./search.scss";

const Search = ({submitFunc, value, fetchSearchInput}) =>{

  // отправляем в store значение input
  const onchange = ({target:{value}}) => fetchSearchInput({value});

  // при фокусе input сменяем в store inputStatus
  const onFocus = () => fetchSearchInput({status:true});

  // при событии форматируем строку, отправляем в store, и меняем url в соответствии со строкой
  onsubmit = (evt) =>{
    evt.preventDefault();
    if (value){
      value = value[0].toUpperCase() + value.slice(1);
      fetchSearchInput({value});
      submitFunc(value);
    }
  }

  return(
    <div className="search">
      <form className="search__form">
        <input type="text" className="search__input" autoFocus placeholder="Введите город" onChange={onchange} value={value}
               onFocus={onFocus} data-search/>
        <button className="search__button" type="submit" onSubmit={onsubmit} data-search>Поиск</button>
      </form>
    </div>
  );
}

const mapStateToProps = ({searchInput: {value}}) => ({value});

const mapDispatchToProps = {fetchSearchInput}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  submitFunc: PropTypes.func.isRequired,
  fetchSearchInput: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);