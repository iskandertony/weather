import React, { useState, useEffect } from 'react';
import {weatherStore} from "../../store/weather";
import {observer} from "mobx-react";
import {weatherStoreWeek} from "../../store/weather-week";
import WeekCarousel from "../carousel";

const Info = observer(() => {
    const [location, setLocation] = useState({lat: null, lon: null});
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
    if (weatherStore.isLoading) return <div>Загрузка данных о погоде...</div>;
    if (weatherStore.error) return <div>Ошибка: {weatherStore.error}</div>;
    if (!weatherStore.weatherData) return <div>Данные о погоде не доступны</div>;

    const { name, weather, main } = weatherStore.weatherData;
    return (
        <div>
            {/*<WeekCarousel />*/}
            <h1>Погода в {name}:</h1>
            <p>Температура: {(main.temp - 273.15).toFixed(2)}°C</p>
            <p>Описание: {weather[0].description}</p>
        </div>
    );
});

export default Info;
