import React from 'react';
import { Modal, Input, Button } from "antd";

const CityModal = ({ isModalVisible, setIsModalVisible, cityName, setCityName, handleOk }) => {
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
};

export default CityModal;
