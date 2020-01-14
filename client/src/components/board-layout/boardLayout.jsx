import React from "react";
import { connect } from "react-redux";

import { deleteBoardASYNC } from "../../redux/boards/boards.actions";
import "./boardLayout.styles.scss";
import { ReactComponent as DeleteSVG } from "../../assets/delete.svg";

const BoardLayout = props => {
  const handleBoardDelete = e => {
    // console.log(e);
    props.deleteBoardASYNC(props.board);
  };
  const { _id, background, name } = props.board;
  return (
    <div className="d-inline-block col-sm-6 col-md-4 col-lg-3 my-3">
      <div className="card board-card delete-btn">
        <img src={background} className="card-img-top" alt="background" />
        <div className="card-body text-center">
          <div className="card-title ">{name}</div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={e => props.history.push(`/boards/${_id}`)}
          >
            View
          </button>
        </div>
        <DeleteSVG onClick={handleBoardDelete} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteBoardASYNC: board => dispatch(deleteBoardASYNC(board))
});
export default connect(null, mapDispatchToProps)(BoardLayout);
