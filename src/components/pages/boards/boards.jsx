import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getAllBoardsASYNC,
  createBoardASYNC
} from "../../../redux/boards/boards.actions";

import Spinner from "react-bootstrap/Spinner";
import Sidenav from "../../sidenav/sidenav";
import BoardLayout from "../../board-layout/boardLayout";

import "./boards.styles.scss";

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
    const { name, background } = this.state;
    e.preventDefault();
    this.props.createBoardASYNC(name, background);
    this.setState({ name: "", background: "" });
  };

  setRandomBackground = () => {
    this.setState({ background: "https://source.unsplash.com/random/800x600" });
  };

  createBoardForm = () => {
    const { background, name } = this.state;

    return (
      <div className="create-card card text-white bg-dark mb-3">
        <div className="card-header">New Board</div>
        <div className="card-body">
          <form className="card-text text-center" onSubmit={this.handleSubmit}>
            <div className="form-group ml-md-3 text-md-left">
              <label htmlFor="username">Name</label>
              <input
                id="username"
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={this.handleChange}
                value={name}
                required
              />
            </div>
            <div className="form-group ml-md-3 text-md-left">
              <label htmlFor="background">Background</label>
              <input
                id="background"
                className="form-control"
                type="text"
                name="background"
                placeholder="Enter Background"
                onChange={this.handleChange}
                value={background}
                required
              />
              <small
                className="ml-auto text-right random-pic"
                onClick={this.setRandomBackground}
              >
                Get Random Image
              </small>
            </div>

            <button className="btn btn-primary px-2" type="submit">
              Create Board
            </button>
          </form>
        </div>
      </div>
    );
  };

  render() {
    const { isFetchingBoards, boards, isCreatingBoard, history } = this.props;

    return (
      <div id="boards-page" className="container-fluid">
        <div className="row mt-5 pl-5">
          <div className="all-boards-listcol-md-3">
            <Sidenav boards={boards} history={history} />
            <span className="ml-3">All Boards</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="invisible-on-small-screen all-boards-list">
              <div className="list-group mt-3">
                {boards.length === 0
                  ? null
                  : boards.map(board => (
                      <Link
                        className="list-group-item"
                        key={board._id}
                        to={`/boards/${board._id}`}
                      >
                        <span role="img" aria-labelledby="emoji">
                          🌀
                        </span>
                        {board.name}
                      </Link>
                    ))}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            {isFetchingBoards ? (
              <div className="all-boards">
                <Spinner animation="border" variant="info" />
              </div>
            ) : (
              <>
                <div className="d-flex col-12 col-sm-6 col-md-6 col-lg-4 my-3">
                  {isCreatingBoard ? (
                    <Spinner
                      animation="border"
                      variant="info"
                      className="mt-5"
                    />
                  ) : (
                    this.createBoardForm()
                  )}
                </div>

                {boards.length === 0
                  ? null
                  : boards.map(board => (
                      <BoardLayout
                        key={board._id}
                        board={board}
                        history={history}
                      />
                    ))}
              </>
            )}
          </div>
        </div>
      </div>
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
