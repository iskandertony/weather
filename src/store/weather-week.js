import { makeAutoObservable } from "mobx";
import axios from 'axios';

class WeatherStoreWeek {
    weatherData = null;
    isLoading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Метод для загрузки данных о погоде
    fetchWeatherDataWeek = async (lat, lon, apiKey) => {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: apiKey,
                    units: "metric" // Для получения температуры в Цельсиях
                }
            });
            this.weatherData = response.data;
        } catch (error) {
            this.error = "Не удалось загрузить данные о погоде.";
            console.error("Ошибка при запросе к OpenWeatherMap:", error);
        } finally {
            this.isLoading = false;
        }
    };
}

export const weatherStoreWeek = new WeatherStoreWeek();
