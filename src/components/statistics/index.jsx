import React from "react";
import Icon from "../icon";
import "./style.scss";

const Statistics = () => {
  return (
    <div className="statistics">
        <div className="flex">
      <Icon name="time" />
      <div className="title">24-hour forecast</div>
        </div>
        {/*<TemperatureChart />*/}
    </div>
  );
};

export default Statistics;