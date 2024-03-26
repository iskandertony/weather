import React, { useEffect } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import WeatherDetails from "../weather-detail";
import { weatherStoreWeek } from "../../store/weather-week";
import WeekDays from "../carousel";
import Icon from "../icon";
import { TIME_GMT } from "../../constants/dateTimeFormat";
import "./style.scss";

const Info = observer(() => {
  const time = moment().utc().format(TIME_GMT);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        weatherStoreWeek.fetchWeatherDataWeek(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (error) => {
        console.error("Ошибка при получении геолокации:", error);
      },
    );
  }, []);

  if (weatherStoreWeek.isLoading) return <Spin />;

  if (weatherStoreWeek.error)
    return <div className="title">error: {weatherStoreWeek.error}</div>;

  if (!weatherStoreWeek.weatherData && !weatherStoreWeek.isLoading)
    return <Spin />;

  return (
    <div className="info">
      <WeekDays weatherData={weatherStoreWeek.weatherData} />
      <div className="flex gap-5 justify-c web">
        <Icon name="time" />
        <div className="time">{time}</div>
      </div>
      <WeatherDetails weatherData={weatherStoreWeek.weatherData} />
    </div>
  );
});

export default Info;
