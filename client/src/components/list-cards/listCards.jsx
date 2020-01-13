import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAllCardsInBoardASYNC,
  createCardASYNC,
  updateCardWhenDropASYNC
} from "../../redux/cards/cards.actions";

import SingleCard from "../single-card/singleCard";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ListCards extends Component {
  state = {
    title: ""
  };

  componentDidMount() {
    this.props.getAllCardsInBoardASYNC();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, listId) => {
    e.preventDefault();
    this.props.createCardASYNC(listId, this.state.title);
  };

  handleDrop = async (e, droppingListId) => {
    e.preventDefault();

    const originalCard = JSON.parse(e.dataTransfer.getData("text/plain"));
    // Update card only if card is moved to other list
    if (droppingListId !== originalCard.listId) {
      this.props.updateCardWhenDropASYNC(originalCard, {
        listId: droppingListId
      });
    }

    e.target.style.background = "#ebecf0";
  };

  handleDragOver = e => {
    e.preventDefault();
  };

  handleDragEnter = e => {
    console.log("entering");
    e.target.style.background = "blue";
  };

  handleDragLeave = e => {
    console.log("leaving");
    e.target.style.background = "#ebecf0";
  };

  render() {
    const { isFetchingCards, isCreatingCard, cards, list } = this.props;
    const { title } = this.state;

    return (
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#ebecf0",
          paddingBottom: "20px"
        }}
        onDrop={e => this.handleDrop(e, list._id)}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
      >
        <div className="row" style={{ overflowY: "scroll", maxHeight: "60vh" }}>
          {isFetchingCards ? (
            <div className="col">
              <Spinner animation="border" variant="info" />
            </div>
          ) : (
            <>
              {cards &&
                cards
                  .filter(card => card.listId === list._id)
                  .map(card => <SingleCard key={card._id} card={card} />)}
              {isCreatingCard ? (
                <div className="col">
                  <Spinner animation="border" variant="info" />
                </div>
              ) : (
                <div className="col my-2">
                  <div
                    className="card bg-dark text-white"
                    style={{ width: "100%", padding: "10px" }}
                  >
                    <Form onSubmit={e => this.handleSubmit(e, list._id)}>
                      <Form.Group controlId="formBasicCardname">
                        <Form.Control
                          required
                          type="text"
                          name="title"
                          placeholder="Enter Card Title"
                          onChange={this.handleChange}
                          value={title}
                        />
                      </Form.Group>

                      <Button
                        className="col-12"
                        variant="primary"
                        type="submit"
                      >
                        Create Card
                      </Button>
                    </Form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingCard: state.board.boardCards.isCreatingCard,
  isFetchingCards: state.board.boardCards.isFetchingCards,
  cards: state.board.boardCards.cards
});

const mapDispatchToProps = dispatch => ({
  getAllCardsInBoardASYNC: () => dispatch(getAllCardsInBoardASYNC()),
  createCardASYNC: (listId, title) => dispatch(createCardASYNC(listId, title)),
  updateCardWhenDropASYNC: (card, update) =>
    dispatch(updateCardWhenDropASYNC(card, update))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCards);
