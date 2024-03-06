import React from 'react';
import moment from 'moment';

const WeatherIcon = ({ weatherData, date }) => {
    // Функция для получения кода иконки по дате
    const getIconForDate = (date) => {
        const weatherItem = weatherData?.list?.find(item => moment(item.dt_txt).format('YYYY-MM-DD') === date);
        return weatherItem ? weatherItem.weather[0].icon : undefined;
    };

    const iconCode = getIconForDate(date);
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}.png` : '';

    return iconUrl ? <img src={iconUrl} alt="Weather icon" /> : <div>No icon available</div>;
};

export default WeatherIcon;
