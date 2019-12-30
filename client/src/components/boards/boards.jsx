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
    isCreatingBoard: false,
    boards: [],
    name: "",
    background: ""
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
    const {
      isFetchingBoards,
      isCreatingBoard,
      background,
      name,
      boards
    } = this.state;
    return isFetchingBoards ? (
      <div className="mt-5">
        <Spinner animation="border" variant="info" />
      </div>
    ) : (
      <Container>
        <Row>
          {boards.map(board => (
            <Col className="col-4 p-3" key={board._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={board.background}
                  alt="background"
                />
                <Card.Body>
                  <Card.Title>{board.name}</Card.Title>
                  <Button
                    type="button"
                    onClick={e =>
                      this.props.history.push(`/boards/${board._id}`)
                    }
                  >
                    Go
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {isCreatingBoard ? (
            <div className="mt-5">
              <Spinner animation="border" variant="info" />
            </div>
          ) : (
            <Col className="col-4 p-3">
              <Form onSubmit={this.handleSubmit}>
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
              https://source.unsplash.com/random/800x600
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default Boards;
