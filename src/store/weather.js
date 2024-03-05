import { makeAutoObservable } from "mobx";
import axios from 'axios';

class WeatherStore {
    weatherData = null; // Начальное состояние данных о погоде
    isLoading = false; // Состояние загрузки
    error = null; // Состояние ошибки

    constructor() {
        makeAutoObservable(this);
    }

    // Действие для загрузки данных о погоде
    fetchWeatherData = async (lat, lon, apiKey) => {
        try {
            this.isLoading = true;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const response = await axios.get(url);
            this.weatherData = response.data;
            this.error = null;
        } catch (error) {
            this.error = "Ошибка при загрузке данных о погоде";
            console.error("Ошибка при запросе к OpenWeatherMap:", error);
        } finally {
            this.isLoading = false;
        }
    };
}

export const weatherStore = new WeatherStore();
