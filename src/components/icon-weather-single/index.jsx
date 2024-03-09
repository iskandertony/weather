import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import {weatherStoreWeek} from "../../store/weather-week";
import {ICONS_API} from "../../constants/ApiUrls";
import "./style.scss";

const WeatherIconSingle = observer(({className}) => {
    const { weatherData, selectedDate } = weatherStoreWeek;

    const getIconForDate = () => {
        const weatherItem = weatherData?.list?.find(item => moment(item.dt_txt).format('YYYY-MM-DD') === moment(selectedDate).format('YYYY-MM-DD'));
        return weatherItem ? weatherItem.weather[0].icon : undefined;
    };

    const iconCode = getIconForDate();
    const iconUrl = iconCode ? `${ICONS_API}/${iconCode}.png` : "";

    return iconUrl ? <img src={iconUrl} alt="Weather icon" className={`icon_single ${className}`} /> : <div>No icon available</div>;
});

export default WeatherIconSingle;
