import React, { useEffect } from 'react';
import {Spin} from "antd";
import {observer} from "mobx-react";
import moment from "moment";
import WeatherDetails from "../weather-detail";
import {weatherStoreWeek} from "../../store/weather-week";
import WeekDays from "../carousel";
import Icon from "../icon";
import "./style.scss";

const Info = observer(() => {
    const time = weatherStoreWeek.selectedDayTime || moment().utc().format('h:mmA [GMT]');
    const apiKey = '1ea24926b6e0dbff93f7fbc24e2fb1cf';

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                weatherStoreWeek.fetchWeatherDataWeek(position.coords.latitude, position.coords.longitude, apiKey);
            }, (error) => {
                console.error("Ошибка при получении геолокации:", error);
            });
        }
    }, []);

    if (weatherStoreWeek.isLoading) return <Spin />;
    if (weatherStoreWeek.error) return <div className="title">Ошибка: {weatherStoreWeek.error}</div>;
    if (!weatherStoreWeek.weatherData && !weatherStoreWeek.isLoading) return <div className="title">Данные о погоде не доступны</div>;

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
