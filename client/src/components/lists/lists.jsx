import React, { Component } from "react";
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
    this.props.createListASYNC(this.state.name);
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
                  <ListLayout list={list} />
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
