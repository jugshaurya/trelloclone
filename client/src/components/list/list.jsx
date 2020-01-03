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
    createNewCard,
    updateCard,
    uploadImage
  } = props;

  return (
    <Container className="col-12" onDrop={onDrop} onDragOver={onDragOver}>
      <Row>
        <Card
          bg="dark"
          text="white"
          style={{ padding: "10px" }}
          className="list"
        >
          <Card.Body>
            <Card.Title>{list.name}</Card.Title>
            <ListCards
              list={list}
              isFetchingCards={isFetchingCards}
              isCreatingCard={isCreatingCard}
              createNewCard={createNewCard}
              cards={cards}
              updateCard={updateCard}
              uploadImage={uploadImage}
            />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default List;
