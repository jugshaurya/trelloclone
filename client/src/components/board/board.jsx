import React from "react";

import Spinner from "react-bootstrap/Spinner";

class Board extends React.Component {
  state = {
    isFetchingBoard: false,
    board: ""
  };

  getBoard = async () => {
    this.setState({ isFetchingBoard: true });
    const id = this.props.match.params.id;
    const response = await fetch(`http://localhost:5000/boards/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const board = await response.json();
    this.setState({ board, isFetchingBoard: false });
  };

  componentDidMount() {
    this.getBoard();
  }

  // handleChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  // };

  render() {
    const { board, isFetchingBoard } = this.state;
    return isFetchingBoard ? (
      <div className="mt-5">
        <Spinner animation="border" variant="info" />
      </div>
    ) : (
      <div
        style={{
          color: "white",
          width: "100vw",
          height: "100vh",
          background: `url(${board.background}) no-repeat`
        }}
      >
        {board.name}
      </div>
    );
  }
}

export default Board;
