import React from "react";
import { connect } from "react-redux";
import { getBoardASYNC } from "../../redux/board/board.actions";

import Lists from "../lists/lists";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SpecificBoard extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getBoardASYNC(boardId);
  }

  render() {
    const { board, isFetchingBoard } = this.props;

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

const mapStateToProps = state => ({
  board: state.board.board,
  isFetchingBoard: state.board.isFetchingBoard
});

const mapDispatchToProps = dispatch => ({
  getBoardASYNC: boardId => dispatch(getBoardASYNC(boardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecificBoard);
