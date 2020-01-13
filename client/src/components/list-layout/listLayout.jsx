import React from "react";
import ListCards from "../list-cards/listCards";

import "./listLayout.styles.scss";
import { ReactComponent as ActivitiesSVG } from "../../assets/modal/modald.svg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const ListLayout = props => {
  const { list } = props;

  return (
    <div
      style={{
        width: "230px"
      }}
      className="card text-white bg-dark mx-2"
    >
      <div className="card-body-padding-low card-body">
        <div className="card-title">
          <ActivitiesSVG />
          {list.name}
        </div>
        <ListCards list={list} />
      </div>
    </div>
  );
};

export default ListLayout;
