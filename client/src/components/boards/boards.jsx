import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Board from "../board/board";

class Boards extends React.Component {
  state = {
    isFetchingBoards: false,
    isCreatingBoard: false,
    boards: [],
    name: "",
    background: ""
  };

  componentDidMount() {
    this.getAllBoards();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.createBoard(e.target);
  };

  getAllBoards = async () => {
    console.log("ast");
    this.setState({ isFetchingBoards: true });
    const response = await fetch("http://localhost:5000/boards", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const boards = await response.json();

    this.setState({ boards, isFetchingBoards: false });
  };

  createBoard = async ({ name, background }) => {
    const newBoard = {
      name: name.value,
      background: background.value
    };
    this.setState({ isCreatingBoard: true });
    const response = await fetch("http://localhost:5000/boards", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBoard)
    });

    const board = await response.json();

    this.setState(prevState => ({
      boards: [...prevState.boards, board],
      isCreatingBoard: false
    }));
  };

  render() {
    const {
      isFetchingBoards,
      isCreatingBoard,
      background,
      name,
      boards
    } = this.state;

    return (
      <Container className="mt-5 col-12">
        {isFetchingBoards ? (
          <Row>
            <Col>
              <Spinner animation="border" variant="info" />
            </Col>
          </Row>
        ) : (
          <Row>
            {boards.map(board => (
              <Col className="col-4" key={board._id}>
                <Board board={board} history={this.props.history} />
              </Col>
            ))}

            <Col className="col-4">
              {isCreatingBoard ? (
                <Spinner animation="border" variant="info" className="mt-5" />
              ) : (
                <Form
                  onSubmit={this.handleSubmit}
                  className="col-12"
                  style={{ background: "lightblue" }}
                >
                  <Form.Group controlId="formBasicBoardname">
                    <Form.Label>Board Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      placeholder="Enter Board name"
                      onChange={this.handleChange}
                      value={name}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicBackground">
                    <Form.Label>Board Background</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="background"
                      placeholder="Enter background"
                      onChange={this.handleChange}
                      value={background}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Create Board
                  </Button>
                </Form>
              )}
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default Boards;
