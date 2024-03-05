import React from 'react';
import Icon from "../icon";
import "./style.scss";

const Menu = () => {
    return (
        <div className="manu">
            <Icon name="avatar" />

            <div className="flex flex-column gap-20">
                <div className="flex flex-column alignC">
                    <Icon name="weather" />
                    <div className="text">weather</div>
                </div>
                <div className="flex flex-column alignC">
                    <Icon name="explore" />
                    <div className="text">explore</div>
                </div>
                <div className="flex flex-column alignC">
                    <Icon name="big_location" />
                    <div className="text">cities</div>
                </div>
                <div className="flex flex-column alignC">
                    <Icon name="settings" />
                    <div className="text">settings</div>
                </div>
            </div>
        </div>
    );
};

export default Menu;