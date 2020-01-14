import React from "react";
import ListCards from "../list-cards/listCards";
import { connect } from "react-redux";
import { deleteListASYNC } from "../../redux/lists/lists.actions";
import "./listLayout.styles.scss";
import { ReactComponent as ActivitiesSVG } from "../../assets/modal/modald.svg";
import { ReactComponent as DeleteSVG } from "../../assets/delete.svg";
const ListLayout = props => {
  const handleListDelete = e => {
    props.deleteListASYNC(props.list);
  };

  const { list } = props;

  return (
    <div
      style={{
        width: "230px"
      }}
      className="card text-white bg-dark mx-2"
    >
      <div className="card-body-padding-low card-body delete-list">
        <div className="card-title">
          <ActivitiesSVG />
          {list.name}
          <DeleteSVG className="delete-svg" onClick={handleListDelete} />
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
