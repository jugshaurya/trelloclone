import React from "react";
import { connect } from "react-redux";
import {
  getAllBoardsASYNC,
  createBoardASYNC
} from "../../redux/boards/boards.actions";

import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import BoardLayout from "../board-layout/boardLayout";

class Boards extends React.Component {
  state = {
    name: "",
    background: ""
  };

  componentDidMount() {
    this.props.getAllBoardsASYNC();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createBoardASYNC(this.state.name, this.state.background);
  };

  render() {
    const { isFetchingBoards, boards, isCreatingBoard } = this.props;
    const { background, name } = this.state;

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
            {boards &&
              boards.map(board => (
                <Col className="col-4" key={board._id}>
                  <BoardLayout board={board} history={this.props.history} />
                </Col>
              ))}

            <Col className="col-4">
              {isCreatingBoard ? (
                <Spinner animation="border" variant="info" className="mt-5" />
              ) : (
                <Card
                  bg="dark"
                  text="white"
                  style={{ width: "18rem", padding: "10px" }}
                >
                  <Form
                    bg="dark"
                    variant="dark"
                    onSubmit={this.handleSubmit}
                    className="col-12"
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
  boards: state.boards.boards,
  isFetchingBoards: state.boards.isFetchingBoards,
  isCreatingBoard: state.boards.isCreatingBoard
});

const mapDispatchToProps = dispatch => ({
  getAllBoardsASYNC: () => dispatch(getAllBoardsASYNC()),
  createBoardASYNC: (name, background) =>
    dispatch(createBoardASYNC(name, background))
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
