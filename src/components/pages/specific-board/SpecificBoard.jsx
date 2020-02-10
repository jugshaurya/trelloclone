import React from "react";
import { connect } from "react-redux";

import {
  getBoardASYNC,
  getPageBoardId
} from "../../../redux/board/board.actions";

import ActivitySidenav from "../../activity-sidenav/activity-sidenav";
import Spinner from "react-bootstrap/Spinner";
import Lists from "../../lists/lists";

import "./SpecificBoard.styles.scss";

class SpecificBoard extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getPageBoardId(boardId);
    this.props.getBoardASYNC();
  }

  render() {
    const { board, isFetchingBoard, match, fetchingBoardError } = this.props;

    return (
      <div id="specific-board" className="container-fluid">
        {isFetchingBoard ? (
          <div className="row">
            <div className="col">
              <Spinner animation="border" variant="info" className="mt-5" />
            </div>
          </div>
        ) : (
          <>
            {fetchingBoardError ? (
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="alert alert-danger">{fetchingBoardError}</div>
                </div>
              </div>
            ) : (
              board && (
                <div className="spec-board">
                  <div
                    className="navbar row text-white px-5"
                    style={{ background: "#212529" }}
                  >
                    {board.name}
                    <div
                      className="activity-nav"
                      style={{ marginRight: "1em" }}
                    >
                      <ActivitySidenav match={match} />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-12"
                      style={{
                        width: "100vw",
                        backgroundImage: `url(${board.background})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                      }}
                    >
                      <Lists match={match} />
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board.boardData.board,
  isFetchingBoard: state.board.boardData.isFetchingBoard,
  fetchingBoardError: state.board.boardData.fetchingBoardError
});

const mapDispatchToProps = dispatch => ({
  getBoardASYNC: () => dispatch(getBoardASYNC()),
  getPageBoardId: boardId => dispatch(getPageBoardId(boardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecificBoard);
