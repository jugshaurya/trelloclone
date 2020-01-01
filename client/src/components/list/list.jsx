import React from "react";
import ListCards from "../list-cards/listCards";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const List = props => {
  const {
    list,
    onDrop,
    onDragOver,
    isFetchingCards,
    isCreatingCard,
    cards,
    createNewCard
  } = props;

  return (
    <Container
      className="col-12"
      style={{ background: "#ffc" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Row>
        <Card className="list">
          <Card.Title>{list.name}</Card.Title>
          <Card.Title>{list._id}</Card.Title>
        </Card>
      </Row>
      <Row>
        <ListCards
          list={list}
          isFetchingCards={isFetchingCards}
          isCreatingCard={isCreatingCard}
          createNewCard={createNewCard}
          cards={cards}
        />
      </Row>
    </Container>
  );
};

export default List;
