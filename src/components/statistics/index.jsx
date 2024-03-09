import React from "react";
import Icon from "../icon";
import "./style.scss";

const Statistics = () => {
  return (
    <div className="statistics">
      <Icon name="time" />
      <div className="title">24-hour forecast</div>
    </div>
  );
};

export default Statistics;