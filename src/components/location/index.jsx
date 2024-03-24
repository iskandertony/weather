import React, {useEffect, useState} from "react";
import { observer } from "mobx-react";
import { StarOutlined, StarFilled, HeartOutlined } from "@ant-design/icons";
import Icon from "../icon";
import { weatherStoreWeek } from "../../store/weather-week";
import WeatherIconSingle from "../icon-weather-single";
import CityModal from "../search-modal";
import FavoritesModal from "../favorites-modal";
import "./style.scss";

const Location = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cityName, setCityName] = useState("");
  const [isFavoritesModalVisible, setIsFavoritesModalVisible] = useState(false);
  const [geoPermission, setGeoPermission] = useState(null);

  const {
    selectedWeatherDetails,
    selectedDate,
    favoriteCities,
    fetchWeatherDataByCityName,
    city,
  } = weatherStoreWeek;

  useEffect(() => {
    // Запрашиваем геолокацию пользователя
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 10000, // Опциональный параметр, например, таймаут 10 секунд
    });
  }, []);


  const handleSuccess = (position) => {
    setGeoPermission(true);
    // Логика для использования позиции пользователя
    // Например, загрузка погодных данных для местоположения пользователя
  };

  const handleError = (error) => {
    // Не зависимо от причины ошибки, показываем модальное окно, если не удалось получить геолокацию
    setGeoPermission(false); // Помечаем, что разрешение на геолокацию не было предоставлено
    showModal(); // Это функция для отображения модального окна поиска
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const trimmedCityName = cityName.trim();
    if (trimmedCityName) {
      fetchWeatherDataByCityName(trimmedCityName);
      setIsModalVisible(false);
      setCityName("");
    }
  };

  const showFavoritesModal = () => {
    setIsFavoritesModalVisible(true);
  };

  const handleCitySelect = async (cityName) => {
    await weatherStoreWeek.selectFavoriteCity(cityName);
    setIsFavoritesModalVisible(false);
  };

  return (
    <div className="location">
      <div className="content">
        <div className="flex gap-10 alignC">
          <div className="flex gap-10 alignC nav" onClick={showModal}>
            <Icon name="location" />
            <div className="name">{city?.name || "Enter City"}</div>
            <Icon name="vector" className="vector" />
          </div>
          <div className="flex gap-5 alignC">
            {weatherStoreWeek.isCityFavorite(city?.name) ? (
              <StarFilled
                style={{ color: "white" }}
                onClick={() =>
                  weatherStoreWeek.removeCityFromFavorites(city.name)
                }
              />
            ) : (
              <StarOutlined
                style={{ color: "white" }}
                onClick={() => weatherStoreWeek.addCityToFavorites(city.name)}
              />
            )}

            <HeartOutlined
              style={{ color: "white" }}
              onClick={showFavoritesModal}
            />
          </div>
        </div>
        <div className="cloud">
          {selectedWeatherDetails
            ? selectedWeatherDetails.weather[0].description
            : "No data"}
        </div>
        <WeatherIconSingle className="mobile" />
      </div>

      <div>
        <div className="title">
          {selectedWeatherDetails
            ? `${selectedWeatherDetails.main.temp.toFixed(0)}°C`
            : "N/A"}
        </div>
        <div className="text">
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date N/A"}
        </div>
      </div>

      <CityModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        cityName={cityName}
        setCityName={setCityName}
        handleOk={handleOk}
      />

      <FavoritesModal
        isFavoritesModalVisible={isFavoritesModalVisible}
        setIsFavoritesModalVisible={setIsFavoritesModalVisible}
        favoriteCities={favoriteCities}
        handleCitySelect={handleCitySelect}
        removeCityFromFavorites={weatherStoreWeek.removeCityFromFavorites.bind(
          weatherStoreWeek,
        )}
      />
    </div>
  );
});

export default Location;
