import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Board extends React.Component {
  state = {
    isFetchingBoard: false,
    isFetchingList: false,
    board: "",
    lists: [],

    isCreatingList: false,
    newListName: ""
  };

  getBoard = async () => {
    this.setState({ isFetchingBoard: true });
    const boardId = this.props.match.params.id;
    const response = await fetch(`http://localhost:5000/boards/${boardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const board = await response.json();
    this.setState({ board, isFetchingBoard: false });
  };

  getAllListInBoard = async () => {
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
      name: this.state.newListName
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
      newListName: ""
    });
  };

  componentDidMount() {
    this.getBoard();
    this.getAllListInBoard();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.createNewList();
  };

  render() {
    const {
      board,
      lists,
      isFetchingBoard,
      isFetchingList,
      isCreatingList,
      newListName
    } = this.state;
    return isFetchingBoard ? (
      <div className="mt-5">
        'hr'
        <Spinner animation="border" variant="info" />
      </div>
    ) : (
      <Container
        style={{
          // color: "white",
          fontWeight: "600",
          fontSize: "2em",
          height: "auto",
          position: "relative",
          top: 0,
          left: 0
          // background: `url(${board.background}) no-repeat`,
        }}
      >
        <Row>{board.name}</Row>
        <Row>
          {isFetchingList ? (
            <Col className="mt-5">
              'ewf'
              <Spinner animation="border" variant="info" />
            </Col>
          ) : (
            <>
              {lists.map(list => (
                <Col className="col-4 p-3" key={list._id}>
                  <Card>
                    <Card.Title>{list.name}</Card.Title>
                  </Card>
                </Col>
              ))}
              {isCreatingList ? (
                <div className="mt-5">
                  'wef'
                  <Spinner animation="border" variant="info" />
                </div>
              ) : (
                <Col className="col-4 p-3">
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicBoardname">
                      <Form.Label>List Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="newListName"
                        placeholder="Enter List name"
                        onChange={this.handleChange}
                        value={newListName}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Create List
                    </Button>
                  </Form>
                </Col>
              )}
            </>
          )}
        </Row>
      </Container>
    );
  }
}

export default Board;
