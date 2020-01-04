import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import MyModal from "../my-modal/myModal";

import { ReactComponent as EditSVG } from "./pencil.svg";
import "./singleCard.styles.scss";

import { updateCardWhenEditASYNC } from "../../redux/cards/cards.actions";
class SingleCard extends Component {
  state = {
    newTitle: this.props.card.title,
    showModal: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.updateCardWhenEditASYNC(this.props.card, {
      title: this.state.newTitle
    });
  };

  setModalShow = show => {
    this.setState({ showModal: show });
  };

  handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
  };

  render() {
    const { card, isUpdatingCardWhileEditing } = this.props;
    const { _id, title } = card;

    return (
      <Container
        className="col-12"
        draggable
        onDragStart={e => this.handleDragStart(e, card)}
      >
        <Row>
          <Col className="col-12" data-id={_id} key={_id}>
            <Card bg="info" text="white" className="card-extra">
              {card.cardImage !== "none" ? (
                <img
                  src={card.cardImage}
                  alt="coverImg"
                  width="200"
                  height="200"
                />
              ) : null}
              {isUpdatingCardWhileEditing ? (
                <Card.Title>
                  <Form onSubmit={this.handleSubmit} className="col-12 pa-5">
                    <Form.Group controlId="formBasicCardEdit" className="col-8">
                      <Form.Control
                        required
                        type="text"
                        name="newTitle"
                        onChange={this.handleChange}
                        value={this.state.newTitle}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="col-4">
                      Save
                    </Button>
                  </Form>
                </Card.Title>
              ) : (
                <ButtonToolbar>
                  <Card.Title onClick={() => this.setModalShow(true)}>
                    {title}
                    <EditSVG onClick={this.handleCardEdit} />
                    <Card.Title>
                      <MyModal
                        show={this.state.showModal}
                        onHide={() => this.setModalShow(false)}
                        card={card}
                      />
                    </Card.Title>
                  </Card.Title>
                </ButtonToolbar>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingCardWhileEditing: state.board.boardCards.isUpdatingCardWhileEditing
});

const mapDispatchToProps = dispatch => ({
  updateCardWhenEditASYNC: (card, update) =>
    dispatch(updateCardWhenEditASYNC(card, update))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCard);
