import React from "react";

import "./search.scss";

const Search = () =>{
  return(
    <div className="search">
      <form className="search__form">
        <input type="text" className="search__input" autoFocus placeholder="Введите город"/>
        <button className="search__button" type="submit">Поиск</button>
      </form>
    </div>
  );
}

export default Search;