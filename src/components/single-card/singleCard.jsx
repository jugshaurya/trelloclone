import React, { Component } from "react";
import { connect } from "react-redux";

import { updateCardWhenEditASYNC } from "../../redux/cards/cards.actions";

import MyModal from "../my-modal/myModal";
import Spinner from "react-bootstrap/Spinner";

import { ReactComponent as EditSVG } from "../../assets/pencil.svg";
import "./singleCard.styles.scss";

class SingleCard extends Component {
  state = {
    newTitle: this.props.card.title,
    showModal: false,
    editMode: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { newTitle } = this.state;
    const { card, updateCardWhenEditASYNC } = this.props;
    e.preventDefault();
    updateCardWhenEditASYNC(card, {
      title: newTitle
    });
    this.setState({ editMode: false });
  };

  setModalShow = show => {
    this.setState({ showModal: show });
  };

  handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
  };

  handleCardEdit = () => {
    this.setState({ editMode: true });
  };

  showEditForm = () => {
    const { isUpdatingCardWhileEditing } = this.props;
    const { newTitle } = this.state;

    return isUpdatingCardWhileEditing ? (
      <div className="card-title">
        <Spinner animation="border" variant="info" />
      </div>
    ) : (
      <div className="card-title">
        <form onSubmit={this.handleSubmit} className="col-12 p-2 pb-1">
          <div className="form-group" htmlFor="newTitle">
            <input
              className="form-control"
              required
              id="newTitle"
              type="text"
              name="newTitle"
              onChange={this.handleChange}
              value={newTitle}
            />
          </div>
          <button type="submit" className="col-12 btn btn-secondary">
            Save
          </button>
        </form>
      </div>
    );
  };

  showCardWithModalAndEditbtn = () => {
    const { showModal } = this.state;
    const { card } = this.props;
    return (
      <>
        <div className="edit-btn">
          <div
            className="card-title title-and-modal"
            onClick={() => this.setModalShow(true)}
          >
            {card.cardImage !== "none" ? (
              <img src={card.cardImage} alt="cover" style={{ width: "100%" }} />
            ) : null}
            <p className="ow px-3">{card.title}</p>
          </div>
          <MyModal
            show={showModal}
            onHide={() => this.setModalShow(false)}
            card={card}
          />
          <EditSVG onClick={this.handleCardEdit} />
        </div>
      </>
    );
  };

  render() {
    const { editMode } = this.state;
    const { card } = this.props;

    return (
      <div
        className="col-12 my-1"
        draggable
        onDragStart={e => this.handleDragStart(e, card)}
      >
        <div className="single-card card">
          {editMode ? this.showEditForm() : this.showCardWithModalAndEditbtn()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingCardWhileEditing: state.board.boardCards.isUpdatingCardWhileEditing
});

const mapDispatchToProps = dispatch => ({
  updateCardWhenEditASYNC: (card, update) =>
    dispatch(updateCardWhenEditASYNC(card, update))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCard);
