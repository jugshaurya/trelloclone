import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";

class Boards extends React.Component {
  state = {
    isFetchingBoards: false,
    boards: [],
    boardName: "",
    boardBackground: ""
  };

  getAllBoards = async () => {
    this.setState({ isFetchingBoards: true });
    const response = await fetch("http://localhost:5000/boards", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const {
      boards = [
        {
          id: 1,
          boardName: "Board #1",
          background: "Grey"
        }
      ]
    } = await response.json();
    this.setState({ boards, isFetchingBoards: false });
  };

  createBoard = async ({ boardName, boardBackground }) => {
    const newBoard = {
      boardName: boardName.value,
      boardBackground: boardBackground.value
    };

    const response = await fetch("http://localhost:5000/boards", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newBoard)
    });

    const board = await response.json();
    this.setState(prevState => ({
      boards: [...prevState.boards, board]
    }));
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

  render() {
    const { isFetchingBoards, boardBackground, boardName, boards } = this.state;
    return isFetchingBoards ? (
      <div className="mt-5">
        <Spinner animation="border" variant="info" />
      </div>
    ) : (
      <Container>
        <Row>
          {boards.map(board => (
            <Col className="col-4 p-3" key={board.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={board.background}
                  alt="background"
                />
                <Card.Body>
                  <Card.Title>{board.boardName}</Card.Title>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          <Col className="col-4 p-3">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicBoardname">
                <Form.Label>Board Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="boardName"
                  placeholder="Enter Board name"
                  onChange={this.handleChange}
                  value={boardName}
                />
              </Form.Group>

              <Form.Group controlId="formBasicBackground">
                <Form.Label>Board Background</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="boardBackground"
                  placeholder="Enter background"
                  onChange={this.handleChange}
                  value={boardBackground}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Board
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Boards;
