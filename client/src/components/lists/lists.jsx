import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getAllListsInBoardASYNC,
  createListASYNC
} from "../../redux/lists/lists.actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import ListLayout from "../list-layout/listLayout";

class Lists extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.props.getAllListsInBoardASYNC();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createListASYNC();
  };

  // @ whatTochange is an object with properiteds to change as its key and value
  updateCard = async (card, whatToChange) => {
    const newCard = { ...card, ...whatToChange };
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
      card._id === newCard._id ? updatedCard : card
    );
    this.setState({ cards });
  };

  handleDrop = async (e, list) => {
    e.preventDefault();
    const originalCard = JSON.parse(e.dataTransfer.getData("text/plain"));
    const droppingListId = list._id;
    this.updateCard(originalCard, { listId: droppingListId });
  };

  handleDragOver = e => {
    e.preventDefault();
  };

  uploadImage = async (image, cardWithImageUpdate) => {
    if (image) {
      const data = new FormData();
      data.append("imageData", image);

      // Looping through arrays created from Object.keys
      const keys = Object.keys(cardWithImageUpdate);
      for (const key of keys) {
        data.set(key, cardWithImageUpdate[key]);
      }

      try {
        const response = await axios.post(
          `http://localhost:5000/cards/uploadmulter`,
          data,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        const updatedCard = await response.data;
        const cards = this.state.cards.map(card =>
          card._id === cardWithImageUpdate._id ? updatedCard : card
        );
        this.setState({ cards });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { isFetchingLists, isCreatingList, lists } = this.props;
    const { name } = this.state;

    return (
      <Container className="mt-5 col-12">
        {isFetchingLists ? (
          <Row>
            <Spinner animation="border" variant="info" />
          </Row>
        ) : (
          <Row>
            {lists &&
              lists.map(list => (
                <Col className="col-4" key={list._id}>
                  <ListLayout
                    list={list}
                    onDrop={e => this.handleDrop(e, list)}
                    onDragOver={this.handleDragOver}
                    updateCard={this.updateCard}
                    uploadImage={this.uploadImage}
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

const mapStateToProps = state => ({
  lists: state.board.boardLists.lists,
  isFetchingLists: state.board.boardLists.isFetchingLists,
  isCreatingList: state.board.boardLists.isCreatingList
});

const mapDispatchToProps = dispatch => ({
  getAllListsInBoardASYNC: () => dispatch(getAllListsInBoardASYNC()),
  createListASYNC: name => dispatch(createListASYNC(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
