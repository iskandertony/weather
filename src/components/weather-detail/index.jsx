import React from "react";
import { observer } from "mobx-react";
import { weatherStoreWeek } from "../../store/weather-week";
import Icon from "../icon";
import "./style.scss";

const WeatherDetails = observer(() => {
  const { selectedWeatherDetails } = weatherStoreWeek;
  const { main, wind, pop } = selectedWeatherDetails;
  const chanceOfRain = (pop * 100).toFixed(0);
  return (
    <div className="weather-details">
      <div className="name">AIR CONDITIONS</div>

      <div className="content">
        <div className="flex gap-5">
          <Icon name="feel" />
          <div>
            <div className="title">Real Feel</div>
            <div className="text">{main.temp}°C</div>
          </div>
        </div>
        <div className="flex gap-5">
          <Icon name="wind" />
          <div>
            <div className="title">Wind</div>
            <div className="text">{wind.speed} km/hr</div>
          </div>
        </div>
        <div className="flex gap-5">
          <Icon name="rain" />
          <div>
            <div className="title">Chance of rain</div>
            <div className="text">{chanceOfRain}%</div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default WeatherDetails;
