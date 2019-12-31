import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { withRouter } from "react-router-dom";
class List extends Component {
  // _id
  // boardId
  // listId
  // title
  // description
  // order
  // membersIds
  // archived
  state = {
    isFetchingCard: false,
    isCreatingCard: false,
    cards: [],
    cardTitle: "",

    description: ""
  };

  getAllCardsInBoard = async () => {
    this.setState({ isFetchingCard: true });
    const boardId = this.props.match.params.id;
    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const cards = await response.json();
    console.log(cards);
    await setTimeout(() => {}, 3000);
    this.setState({ cards, isFetchingCard: false });
  };

  createNewCard = async () => {
    this.setState({ isCreatingCard: true });
    const boardId = this.props.match.params.id;
    const newCard = {
      listId: this.props.listId,
      title: this.state.cardTitle,
      description: this.state.description || "later" // will change later
    };
    console.log(newCard);

    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const card = await response.json();
    console.log(card);
    this.setState({
      cards: [...this.state.cards, card],
      isCreatingCard: false,
      cardTitle: "",
      description: "",
      order: 0,
      archived: false
    });
  };

  componentDidMount() {
    this.getAllCardsInBoard();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.createNewCard();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isCreatingCard, isFetchingCard, cards, cardTitle } = this.state;
    return (
      <Card className="list">
        <Card.Title>{this.props.name}</Card.Title>
        <Container>
          <Row>
            {isFetchingCard ? (
              <Col className="mt-5">
                <Spinner animation="border" variant="info" />
              </Col>
            ) : (
              <>
                {cards
                  .filter(card => card.listId === this.props.listId)
                  .map(card => (
                    <Col className="col-12">
                      <Card key={card._id}>
                        <Card.Title>{card.title}</Card.Title>
                        {/* <Card.Text>{card.description}</Card.Text> */}
                      </Card>
                    </Col>
                  ))}

                {/* {lists.map(list => (
                  <Col className="col-4 p-3" key={list._id}>
                    <List name={list.name} listId={list._id} />
                  </Col>
                ))} */}
                {isCreatingCard ? (
                  <div className="mt-5">
                    <Spinner animation="border" variant="info" />
                  </div>
                ) : (
                  <Col className="col-12 p-3">
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="formBasicCardname">
                        <Form.Label>Create Card</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="cardTitle"
                          placeholder="Enter Card Title"
                          onChange={this.handleChange}
                          value={cardTitle}
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Create Card
                      </Button>
                    </Form>
                  </Col>
                )}
              </>
            )}
          </Row>
        </Container>
      </Card>
    );
  }
}

export default withRouter(List);
