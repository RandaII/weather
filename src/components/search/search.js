import React, {useState} from "react";

import "./search.scss";

const Search = ({submitFunc}) =>{

  const [inputValue, setInputValue] = useState(``);

  onchange = ({target:{value}}) => setInputValue(value);

  onsubmit = (evt) =>{
    evt.preventDefault();
    if (inputValue){
      submitFunc(inputValue);
    }
  }

  return(
    <div className="search">
      <form className="search__form">
        <input type="text" className="search__input" autoFocus placeholder="Введите город" onChange={onchange} value={inputValue}/>
        <button className="search__button" type="submit" onSubmit={onsubmit}>Поиск</button>
      </form>
    </div>
  );
}

export default Search;