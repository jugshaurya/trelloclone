import React from "react";
import { connect } from "react-redux";

import { deleteListASYNC } from "../../redux/lists/lists.actions";

import ListCards from "../list-cards/listCards";

import { ReactComponent as ActivitiesSVG } from "../../assets/modal/modald.svg";
import { ReactComponent as DeleteSVG } from "../../assets/delete.svg";
import "./listLayout.styles.scss";

const ListLayout = ({ deleteListASYNC, list }) => {
  return (
    <div className="card list-card text-white bg-dark mx-2">
      <div className="card-body-padding-low card-body delete-list">
        <div className="card-title">
          <ActivitiesSVG />
          {list.name}
          <DeleteSVG
            className="delete-svg"
            onClick={() => deleteListASYNC(list)}
          />
        </div>
        <ListCards list={list} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteListASYNC: list => dispatch(deleteListASYNC(list))
});
export default connect(null, mapDispatchToProps)(ListLayout);
