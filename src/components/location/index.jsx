import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Input } from "antd";
import Icon from "../icon";
import { weatherStoreWeek } from "../../store/weather-week";
import cloud from "../../assets/img/cloud.png";
import "./style.scss";
import WeatherIconSingle from "../icon-weather-single";

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
    setIsModalVisible(false);
    const name = cityName.trim()
    if (name) {
      fetchWeatherDataByCityName(name);
    } else {
      alert("Please enter city name");
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
      <div className="content" onClick={showModal}>
        <div className="flex gap-10 alignC nav">
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
