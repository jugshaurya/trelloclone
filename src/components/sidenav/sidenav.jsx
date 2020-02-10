import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./sidenav.styles.scss";

const Sidenav = props => {
  const [width, setWidth] = useState(0);
  const [padding, setPadding] = useState(0);

  const openNav = () => {
    setWidth(300);
    setPadding(40);
  };

  const closeNav = () => {
    setWidth(0);
    setPadding(0);
  };

  const showBoards = () => {
    const { boards, history } = props;
    return boards.map(board => (
      <span
        className="span-top"
        key={board._id}
        onClick={() => history.push(`/boards/${board._id}`)}
      >
        <span role="img" aria-labelledby="emoji">
          💡
        </span>
        {board.name}
      </span>
    ));
  };

  return (
    <>
      <div
        className="sidenav"
        style={{
          width: `${width}px`,
          paddingLeft: `${padding}px`,
          paddingRight: `${padding}px`
        }}
      >
        <Link to="#" className="closebtn" onClick={closeNav}>
          &times;
        </Link>

        {props.boards && showBoards()}
      </div>

      <span id="list-icons" onClick={openNav}>
        &#9776;
      </span>
    </>
  );
};

export default Sidenav;
