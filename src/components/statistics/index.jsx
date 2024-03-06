import React from 'react';
import "./style.scss";
import Icon from "../icon";

const Statistics = () => {
    return (
        <div className="statistics">
            <Icon name="time" />
            <div className="title">24-hour forecast</div>
        </div>
    );
};

export default Statistics;