import React, { Component } from "react";

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

class SingleCard extends Component {
  state = {
    editing: false,
    newTitle: this.props.card.title,
    showModal: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCardEdit = () => {
    this.setState({ editing: true });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.updateCard(this.props.card, {
      title: this.state.newTitle
    });
    this.setState({ editing: false });
  };

  setModalShow = show => {
    this.setState({ showModal: show });
  };

  render() {
    const { card, onDragStart, uploadImage } = this.props;
    const {
      _id,
      title
      // , description, labels, cardImage
    } = card;
    // console.log(card);

    return (
      <Container className="col-12" onDragStart={onDragStart}>
        <Row>
          <Col className="col-12" data-id={_id} key={_id}>
            <Card bg="info" text="white" className="card-extra">
              {card.cardImage ? (
                <img src={card.cardImage} alt="pl" width="200" height="200" />
              ) : null}
              {this.state.editing ? (
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
                        uploadImage={uploadImage}
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

export default SingleCard;
