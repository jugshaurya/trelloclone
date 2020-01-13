import React from "react";

const BoardLayout = props => {
  const { _id, background, name } = props.board;
  return (
    <div className="d-inline-block col-sm-6 col-md-4 col-lg-3 my-3">
      <div className="card">
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
      </div>
    </div>
  );
};

export default BoardLayout;
