import React from "react";
import { connect } from "react-redux";
import { getBoardASYNC, getPageBoardId } from "../../redux/board/board.actions";

import Lists from "../lists/lists";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Activities from "../acitivities/activities";

class SpecificBoard extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getPageBoardId(boardId);
    this.props.getBoardASYNC();
  }

  render() {
    const { board, isFetchingBoard } = this.props;

    return (
      <Container>
        <Row>
          {isFetchingBoard ? (
            <Container>
              <Row>
                <Col className="mt-5 col-12">
                  <Spinner animation="border" variant="info" />
                </Col>
              </Row>
            </Container>
          ) : (
            board && (
              <>
                <Col className="col-8" style={{ background: "lightgray" }}>
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
                </Col>
                <Col className="col-4" style={{ background: "lightblue" }}>
                  <Activities match={this.props.match} />
                </Col>
              </>
            )
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board.boardData.board,
  isFetchingBoard: state.board.boardData.isFetchingBoard
});

const mapDispatchToProps = dispatch => ({
  getBoardASYNC: () => dispatch(getBoardASYNC()),
  getPageBoardId: boardId => dispatch(getPageBoardId(boardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecificBoard);
