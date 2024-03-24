import React from 'react';
import {Button, Modal} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import "./style.scss";
const FavoritesModal = ({ isFavoritesModalVisible, setIsFavoritesModalVisible, favoriteCities, handleCitySelect, removeCityFromFavorites }) => {
    const handleFavoritesModalClose = () => {
        setIsFavoritesModalVisible(false);
    };

    const handleRemoveCity = (e, cityName) => {
        e.stopPropagation();
        removeCityFromFavorites(cityName);
    };

    return (
        <Modal
            title="Favorite Cities"
            open={isFavoritesModalVisible}
            onCancel={handleFavoritesModalClose}
            footer={[<Button key="back" onClick={handleFavoritesModalClose}>Close</Button>]}
        >
            {favoriteCities.length > 0 ? (
                favoriteCities.map((cityName) => (
                    <div key={cityName} className="favorite-city-item">
                        <div className="city-name" onClick={() => handleCitySelect(cityName)}>
                            {cityName}
                        </div>
                        <DeleteOutlined className="city-delete-icon" onClick={(e) => handleRemoveCity(e, cityName)} />
                    </div>
                ))
            ) : (
                <p>The list of favorite cities is empty</p>
            )}
        </Modal>
    );
};

export default FavoritesModal;
