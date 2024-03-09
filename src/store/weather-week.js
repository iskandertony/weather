import { makeAutoObservable } from "mobx";
import axios from "axios";
import moment from "moment";
import {API, API_KEY} from "../constants/ApiUrls";
import {DATE} from "../constants/dateTimeFormat";

class WeatherStoreWeek {
  weatherData = null;
  isLoading = false;
  error = null;
  selectedDate = null;
  city = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedDate(date) {
    this.selectedDate = date;
  }

  get uniqueDates() {
    if (!this.weatherData || !this.weatherData.list) return [];
    const dates = this.weatherData.list.map((item) =>
      moment(item.dt_txt).format(DATE),
    );
    const uniqueDates = Array.from(new Set(dates));
    return uniqueDates.slice(0, 5);
  }

  get selectedWeatherDetails() {
    if (!this.selectedDate || !this.weatherData || !this.weatherData.list)
      return null;

    return this.weatherData.list.find((item) => {
      const dateFromItem = moment(item.dt_txt).format(DATE);
      return dateFromItem === moment(this.selectedDate).format(DATE);
    });
  }

  fetchWeatherDataWeek = async (lat, lon) => {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get(API.forecast, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      });
      this.weatherData = response.data;
      this.city = response.data.city;
      if (this.weatherData.list.length > 0) {
        this.selectedDate = this.uniqueDates[0];
      }
    } catch (error) {
      this.error = error.message;
      console.error("Ошибка при запросе к OpenWeatherMap:", error);
    } finally {
      this.isLoading = false;
    }
  };

  fetchWeatherDataByCityName = async (cityName) => {
    this.isLoading = true;
    this.error = null;
    this.city = null;
    try {
      const response = await axios.get(API.forecast, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: "metric",
        },
      });
      this.weatherData = response.data;
      this.city = response.data.city;
      if (this.weatherData.list.length > 0) {
        this.selectedDate = this.uniqueDates[0];
      }
    } catch (error) {
      this.error =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Ошибка при загрузке данных о погоде.";
      console.error("Ошибка при запросе к OpenWeatherMap:", error);
    } finally {
      this.isLoading = false;
    }
  };
}

export const weatherStoreWeek = new WeatherStoreWeek();
