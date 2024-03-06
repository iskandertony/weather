import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Input } from "antd";
import Icon from "../icon";
import { weatherStoreWeek } from "../../store/weather-week";
import cloud from "../../assets/img/cloud.png";
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
  const apiKey = "1ea24926b6e0dbff93f7fbc24e2fb1cf";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (cityName.trim()) {
      fetchWeatherDataByCityName(cityName.trim(), apiKey);
    } else {
      alert("Please enter a valid city name");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

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
        <img src={cloud} alt="" className="img mobile" />
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
