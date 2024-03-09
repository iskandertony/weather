import React, { useState } from "react";
import { observer } from "mobx-react";
import {Modal, Input, Button} from "antd";
import Icon from "../icon";
import { weatherStoreWeek } from "../../store/weather-week";
import WeatherIconSingle from "../icon-weather-single";
import "./style.scss";

const Location = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cityName, setCityName] = useState("");
  const {
    selectedWeatherDetails,
    selectedDate,
    fetchWeatherDataByCityName,
    city,
  } = weatherStoreWeek;
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };
  console.log("city", city?.name)

  return (
    <div className="location">
      <div className="content">
        <div className="flex gap-10 alignC nav" onClick={showModal}>
          <Icon name="location" />
          <div className="name">{city?.name || "Enter City"}</div>
          <Icon name="vector" className="vector" />
        </div>
        <div className="cloud">
          {selectedWeatherDetails
            ? selectedWeatherDetails.weather[0].description
            : "Cloudy"}
        </div>
        <WeatherIconSingle className="mobile"  />
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

      <Modal
        title="Enter City Name"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              disabled={!cityName.trim()} // Делаем кнопку неактивной, если имя города пустое
          >
            OK
          </Button>,
        ]}
      >
        <Input
          placeholder="City name"
          onChange={handleCityNameChange}
          value={cityName}
          onPressEnter={handleOk}
        />
      </Modal>
    </div>
  );
});

export default Location;
