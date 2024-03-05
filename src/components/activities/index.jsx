import React from "react";
import Icon from "../icon";
import img from "../../assets/img/activity.png";
import './style.scss';

const Activity = () => {
  return (
    <div className="activity">
      <div className="flex alignC gap-5">
        <Icon name="heart" />
        <div className="title">Activities in your area</div>
      </div>
      <div className="content">
        <div>
          <div>
            <img src={img} alt="" className="activity_img" />
          </div>
          <div className="text">2km away</div>
        </div>
        <div>
          <div>
            <img src={img} alt="" className="activity_img" />

          </div>
          <div className="text">2km away</div>
        </div>
        <div>
          <div>
            <img src={img} alt="" className="activity_img" />

          </div>
          <div className="text">2km away</div>
        </div>
        <div>
          <div>
            <img src={img} alt="" className="activity_img" />

          </div>
          <div className="text">2km away</div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
