import React from "react";
import { connect } from "react-redux";
import {
  getBoardASYNC,
  getPageBoardId
} from "../../../redux/board/board.actions";

import Lists from "../../lists/lists";
import Spinner from "react-bootstrap/Spinner";
import "./SpecificBoard.styles.scss";
import ActivitySidenav from "../../activity-sidenav/activity-sidenav";
class SpecificBoard extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getPageBoardId(boardId);
    this.props.getBoardASYNC();
  }

  render() {
    const { board, isFetchingBoard, match } = this.props;

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
            {this.props.fetchingBoardError ? (
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="alert alert-danger">
                    {this.props.fetchingBoardError}
                  </div>
                </div>
              </div>
            ) : (
              board && (
                <div className="spec-board">
                  <div
                    className="navbar row text-white"
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
