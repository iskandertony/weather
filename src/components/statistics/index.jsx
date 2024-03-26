import React from "react";
import Icon from "../icon";
import "./style.scss";

const Statistics = () => {
  return (
    <div className="statistics">
      <div className="flex gap-5">
        <Icon name="time" />
        <div className="title">24-hour forecast</div>
      </div>
    </div>
  );
};

export default Statistics;
