import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import WeatherIcon from "../icon-weather";
import { weatherStoreWeek } from "../../store/weather-week";
import "./style.scss";

const WeekDays = observer(({ weatherData }) => {
  const { uniqueDates } = weatherStoreWeek;

  return (
    <div className="vertical-calendar">
      {uniqueDates?.map((date) => (
        <div
          key={date}
          className={`date-item ${date === weatherStoreWeek.selectedDate ? "active" : ""}`}
          onClick={() => weatherStoreWeek.setSelectedDate(date)}
        >
          <div
            className={`title ${date === weatherStoreWeek.selectedDate ? "active" : ""}`}
          >
            {moment(date).format("ddd").toUpperCase()}
          </div>
          <WeatherIcon date={date} weatherData={weatherData} />
        </div>
      ))}
    </div>
  );
});

export default WeekDays;
