import React from "react";
import Icon from "../icon";
import "./style.scss";

const Location = () => {
  return (
    <div className="location">
      <div className="content">
        <div className="flex gap-10 alignC">
          <Icon name="location" />
          <div className="name">New York</div>
          <Icon name="vector" className="vector" />
        </div>

        <div className="cloud">Cloudy</div>
      </div>

      <div>
        <div className="title">26°C</div>
        <div className="text">Sunday | 12 Dec 2023</div>
      </div>
    </div>
  );
};

export default Location;
