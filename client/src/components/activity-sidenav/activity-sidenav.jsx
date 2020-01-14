import React, { useState } from "react";
import { Link } from "react-router-dom";

import Activities from "../activities/activities";
import "./activity-sidenav.styles.scss";

const ActivitySidenav = props => {
  const [width, setWidth] = useState(0);
  const [padding, setPadding] = useState(0);

  const openNav = () => {
    setWidth(400);
    setPadding(10);
  };

  const closeNav = () => {
    setWidth(0);
    setPadding(0);
  };

  return (
    <>
      <div
        className="activity-sidenav"
        style={{
          width: `${width}px`,
          paddingLeft: `${padding}px`,
          paddingRight: `${padding}px`
        }}
      >
        <Link to="#" className="activity-closebtn" onClick={closeNav}>
          &times;
        </Link>
        <Activities match={props.match} />
      </div>

      <span id="activity-list-icons" onClick={openNav}>
        &#9776; Activities
      </span>
    </>
  );
};

export default ActivitySidenav;
