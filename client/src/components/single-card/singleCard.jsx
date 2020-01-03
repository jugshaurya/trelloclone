import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./singleCard.styles.scss";
import { ReactComponent as EditSVG } from "./pencil.svg";
import Form from "react-bootstrap/Form";

class SingleCard extends Component {
  state = {
    editing: false,
    newTitle: this.props.card.title
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

  render() {
    const { card, onDragStart } = this.props;
    const { _id, title, description } = card;

    return (
      <Container className="col-12" onDragStart={onDragStart}>
        <Row>
          <Col className="col-12" data-id={_id} key={_id}>
            <Card bg="info" text="white" className="card-extra">
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
                <>
                  <Card.Title>
                    {title}
                    <EditSVG onClick={this.handleCardEdit} />
                  </Card.Title>
                </>
              )}
              {/* <Card.Text>{description}</Card.Text> */}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SingleCard;
