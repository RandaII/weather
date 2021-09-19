import React from "react";
import Search from "../search";
import WeatherCard from "../weather-card";

import "./app.scss";

const App = () => {
  return (
    <>
      <Search></Search>
      <section className="weather-cards">
        <WeatherCard></WeatherCard>
      </section>
    </>
  );
}

export default App;