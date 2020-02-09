import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAllCardsInBoardASYNC,
  createCardASYNC,
  updateCardWhenDropASYNC
} from "../../redux/cards/cards.actions";

import SingleCard from "../single-card/singleCard";

import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./listCards.styles.scss";

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

  handleCreateCard = (e, listId) => {
    e.preventDefault();
    this.props.createCardASYNC(listId, this.state.title);
    this.setState({ title: "" });
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
    // e.target.style.background = "blue";
  };

  handleDragLeave = e => {
    // e.target.style.background = "#ebecf0";
  };

  renderListCards = () => {
    const { isFetchingCards, cards } = this.props;

    return isFetchingCards ? (
      <div className="col">
        <Spinner animation="border" variant="info" />
      </div>
    ) : (
      <>
        {cards &&
          cards
            .filter(card => card.listId === this.props.list._id)
            .map(card => <SingleCard key={card._id} card={card} />)}
      </>
    );
  };

  renderCreateCardForm = () => {
    return this.props.isCreatingCard ? (
      <div className="col">
        <Spinner animation="border" variant="info" />
      </div>
    ) : (
      <div className="col my-2">
        <div className="card bg-dark text-white list-cards-form">
          <Form onSubmit={e => this.handleCreateCard(e, this.props.list._id)}>
            <Form.Group controlId="formBasicCardname">
              <Form.Control
                required
                type="text"
                name="title"
                placeholder="Enter Card Title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Form.Group>

            <Button className="col-12" variant="primary" type="submit">
              Create Card
            </Button>
          </Form>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        className="container-fluid list-cards"
        onDrop={e => this.handleDrop(e, this.props.list._id)}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
      >
        <div className="row overflow-y">
          {this.renderListCards()}
          {this.renderCreateCardForm()}
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
