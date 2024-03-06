import React, { useState, useEffect } from 'react';
import {Spin} from "antd";
import {observer} from "mobx-react";
import moment from "moment";
import {weatherStore} from "../../store/weather";
import WeatherDetails from "../weather-detail";
import {weatherStoreWeek} from "../../store/weather-week";
import WeekDays from "../carousel";
import "./style.scss";
import Icon from "../icon";

const Info = observer(() => {
    const [location, setLocation] = useState({lat: null, lon: null});
    const time = weatherStoreWeek.selectedDayTime || moment().utc().format('h:mmA [GMT]');
    const apiKey = '1ea24926b6e0dbff93f7fbc24e2fb1cf';

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            }, (error) => {
                console.error("Ошибка при получении геолокации:", error);
            });
        }
    }, []);

    useEffect(() => {
        if (location.lat && location.lon) {
            weatherStoreWeek.fetchWeatherDataWeek(location.lat, location.lon, apiKey);

        }
    }, [location]);
    console.log("weatherStore.weatherData", weatherStore.weatherData)
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
