import React from "react";

import Lists from "../lists/lists";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SpecificBoard extends React.Component {
  state = {
    isFetchingBoard: false,
    board: null
  };

  componentDidMount() {
    this.getBoard();
  }

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

  render() {
    const { board, isFetchingBoard } = this.state;

    return !board || isFetchingBoard ? (
      <Container className="col-12 mt-5">
        <Row>
          <Col className="mt-5">
            <Spinner animation="border" variant="info" />
          </Col>
        </Row>
      </Container>
    ) : (
      <Container
        className="col-12 mt-5"
        style={{
          color: "Blue",
          fontWeight: "600",
          fontSize: "2em"

          // height: "100%",
          // width: "100%",
          // position: "relative",
          // top: 0,
          // left: 0,
          // background: `url(${board.background}) no-repeat`
        }}
      >
        <Row className="mb-5">{board.name}</Row>
        <Row>
          <Lists match={this.props.match} />
        </Row>
      </Container>
    );
  }
}

export default SpecificBoard;
