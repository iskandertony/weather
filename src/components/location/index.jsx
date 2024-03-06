import React from "react";
import { observer } from "mobx-react";
import Icon from "../icon";
import "./style.scss";
import {weatherStoreWeek} from "../../store/weather-week";
import WeatherIcon from "../icon-weather";
import cloud from "../../assets/img/cloud.png";

const Location = observer(() => {
    const { selectedWeatherDetails, selectedDate } = weatherStoreWeek;

    const weatherDescription = selectedWeatherDetails ? selectedWeatherDetails.weather[0].description : 'Cloudy';
    const temperature = selectedWeatherDetails ? selectedWeatherDetails.main.temp.toFixed(0) : 'N/A';
    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date N/A';

    return (
        <div className="location">
            <div className="content">
                <div className="flex gap-10 alignC nav">
                    <Icon name="location" />
                    <div className="name">{weatherStoreWeek.city?.name}</div>
                    <Icon name="vector" className="vector" />
                </div>
                <div className="cloud">{weatherDescription}</div>
                <img src={cloud} alt="" className="img mobile" />
            </div>

            <div>
                <div className="title">{temperature}°C</div>
                <div className="text">{formattedDate}</div>
            </div>
        </div>
    );
});

export default Location;
