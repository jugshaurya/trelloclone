import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import List from "../list/list";

class Lists extends Component {
  state = {
    isFetchingLists: false,
    isCreatingList: false,
    lists: [],
    cards: [],
    isFetchingCards: false,
    isCreatingCard: false,
    name: ""
  };

  componentDidMount() {
    this.getAllListsInBoard();
    this.getAllCardsInBoard();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.createNewList();
  };

  getAllListsInBoard = async () => {
    this.setState({ isFetchingList: true });
    const boardId = this.props.match.params.id;
    const response = await fetch(`http://localhost:5000/lists/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const lists = await response.json();
    this.setState({ lists, isFetchingList: false });
  };

  createNewList = async () => {
    this.setState({ isCreatingList: true });
    const boardId = this.props.match.params.id;
    const newList = {
      name: this.state.name
    };

    const response = await fetch(`http://localhost:5000/lists/${boardId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newList)
    });

    const list = await response.json();
    this.setState({
      lists: [...this.state.lists, list],
      isCreatingList: false,
      name: ""
    });
  };

  getAllCardsInBoard = async () => {
    this.setState({ isFetchingCards: true });
    const boardId = this.props.match.params.id;
    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const cards = await response.json();
    await setTimeout(() => {}, 3000);
    this.setState({ cards, isFetchingCards: false });
  };

  createNewCard = async (listId, title, description) => {
    this.setState({ isCreatingCard: true });
    const boardId = this.props.match.params.id;
    const newCard = {
      listId,
      title,
      description: description || "later" // will change later
    };

    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const card = await response.json();
    this.setState({
      cards: [...this.state.cards, card],
      isCreatingCard: false
    });
  };

  handleDrop = async (e, list) => {
    e.preventDefault();
    const droppingListId = list._id;
    const draggedCard = JSON.parse(e.dataTransfer.getData("text/plain"));

    const newCard = {
      ...draggedCard,
      listId: droppingListId
    };
    const boardId = this.props.match.params.id;

    const response = await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newCard)
    });

    const updatedCard = await response.json();
    const cards = this.state.cards.map(card =>
      card._id === draggedCard._id ? updatedCard : card
    );

    this.setState({ cards });
  };

  handleDragOver = e => {
    e.preventDefault();
  };

  render() {
    const {
      isFetchingLists,
      isFetchingCards,
      cards,
      isCreatingList,
      isCreatingCard,
      lists,
      name
    } = this.state;

    return (
      <Container className="mt-5 col-12">
        {isFetchingLists ? (
          <Row>
            <Spinner animation="border" variant="info" />
          </Row>
        ) : (
          <Row>
            {lists.map(list => (
              <Col className="col-4" key={list._id}>
                <List
                  list={list}
                  onDrop={e => this.handleDrop(e, list)}
                  onDragOver={this.handleDragOver}
                  cards={cards.filter(card => card.listId === list._id)}
                  isFetchingCards={isFetchingCards}
                  isCreatingCard={isCreatingCard}
                  createNewCard={this.createNewCard}
                />
              </Col>
            ))}
            <Col className="col-4">
              {isCreatingList ? (
                <Spinner animation="border" variant="info" className="mt-5" />
              ) : (
                <Card
                  bg="dark"
                  text="white"
                  style={{ width: "18rem", padding: "10px" }}
                >
                  <Form onSubmit={this.handleSubmit} className="col-12 pa-5">
                    <Form.Group controlId="formBasicListname">
                      <Form.Label>Create List</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        placeholder="Enter List name"
                        onChange={this.handleChange}
                        value={name}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Create List
                    </Button>
                  </Form>
                </Card>
              )}
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default Lists;
