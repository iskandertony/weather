import React, {useState} from 'react';
import {observer} from "mobx-react";
import { Modal, Input, Button } from "antd";
import {weatherStoreWeek} from "../../store/weather-week";

const CityModal = observer(({ isModalVisible, setIsModalVisible }) => {
    const [cityName, setCityName] = useState("");

    const {
        fetchWeatherDataByCityName,
    } = weatherStoreWeek;

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

    return (
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
                    disabled={!cityName.trim()}
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
    );
});

export default CityModal;
