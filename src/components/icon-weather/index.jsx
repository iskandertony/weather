import React from "react";
import moment from "moment";
import {ICONS_API} from "../../constants/ApiUrls";
import {DATE} from "../../constants/dateTimeFormat";

const WeatherIcon = ({ weatherData, date }) => {
  const getIconForDate = (date) => {
    const weatherItem = weatherData?.list?.find(
      (item) => moment(item.dt_txt).format(DATE) === date,
    );
    return weatherItem ? weatherItem.weather[0].icon : undefined;
  };

  const iconCode = getIconForDate(date);
  const iconUrl = iconCode ? `${ICONS_API}/${iconCode}.png` : "";

  return iconUrl ? (
    <img src={iconUrl} alt="Weather icon" />
  ) : (
    <div>No icon available</div>
  );
};

export default WeatherIcon;
