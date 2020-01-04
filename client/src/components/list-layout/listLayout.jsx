import React from "react";
import ListCards from "../list-cards/listCards";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const ListLayout = props => {
  const { list } = props;

  return (
    <Container className="col-12">
      <Row>
        <Card
          bg="dark"
          text="white"
          style={{ padding: "10px" }}
          className="list"
        >
          <Card.Body>
            <Card.Title>{list.name}</Card.Title>
            <ListCards list={list} />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ListLayout;