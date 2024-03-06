import React from 'react';
import moment from 'moment';
import "./style.scss";
import WeatherIcon from "../icon-weather";
import {weatherStoreWeek} from "../../store/weather-week";
import {observer} from "mobx-react";

const WeekDays = observer(({ weatherData }) => {
    const { uniqueDates } = weatherStoreWeek;

    const getIconForDate = (date) => {
        const weatherItem = weatherData.list.find(item => moment(item.dt_txt).format('YYYY-MM-DD') === date);
        return weatherItem ? weatherItem.weather[0].icon : undefined;
    };

    return (
        <div className="vertical-calendar">
            {uniqueDates?.map(date => (
                <div key={date}
                     className={`date-item ${date === weatherStoreWeek.selectedDate ? 'active' : ''}`}
                     onClick={() => weatherStoreWeek.setSelectedDate(date)}>
                    <div className={`title ${date === weatherStoreWeek.selectedDate ? 'active' : ''}`}>{moment(date).format('ddd').toUpperCase()}</div>
                    <WeatherIcon date={date} weatherData={weatherData} />
                </div>
            ))}
        </div>
    );
});

export default WeekDays;
