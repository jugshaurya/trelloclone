import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import SingleCard from "../single-card/singleCard";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ListCards extends Component {
  state = {
    title: "",
    description: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, listId) => {
    e.preventDefault();
    this.props.createNewCard(listId, this.state.title, this.state.description);
  };

  handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
    console.log("Dragging Started");
  };

  render() {
    console.log("iohfa", this.state.cards);
    const { isFetchingCards, isCreatingCard, cards, list } = this.props;
    const { title, description } = this.state;
    return isFetchingCards ? (
      <Container className="col-12">
        <Row>
          <Spinner animation="border" variant="info" />
        </Row>
      </Container>
    ) : (
      <Container className="col-12">
        <Row>
          {cards.map(card => (
            <Col className="col-12" key={card._id}>
              <SingleCard
                card={card}
                draggable
                onDragStart={e => this.handleDragStart(e, card)}
              />
            </Col>
          ))}
          {isCreatingCard ? (
            <Col className="col-12 mt-5">
              <Spinner animation="border" variant="info" />
            </Col>
          ) : (
            <Col className="col-12">
              <Form onSubmit={e => this.handleSubmit(e, list._id)}>
                <Form.Group controlId="formBasicCardname">
                  <Form.Label>Create Card</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    placeholder="Enter Card Title"
                    onChange={this.handleChange}
                    value={title}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Create Card
                </Button>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default withRouter(ListCards);
