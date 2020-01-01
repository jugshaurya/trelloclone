import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Board = props => {
  const { _id, background, name } = props.board;
  return (
    <Container className="col-12">
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={background} alt="background" />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Button
                type="button"
                onClick={e => props.history.push(`/boards/${_id}`)}
              >
                Go
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Board;
