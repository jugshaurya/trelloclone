import React, { Component } from "react";
import { connect } from "react-redux";
import MyModal from "../my-modal/myModal";
import Spinner from "react-bootstrap/Spinner";

import { ReactComponent as EditSVG } from "./pencil.svg";
import "./singleCard.styles.scss";

import { updateCardWhenEditASYNC } from "../../redux/cards/cards.actions";
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
    e.preventDefault();
    this.props.updateCardWhenEditASYNC(this.props.card, {
      title: this.state.newTitle
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

  render() {
    const { card, isUpdatingCardWhileEditing } = this.props;
    const { _id, title } = card;

    return (
      <div
        className="col-12 my-1"
        draggable
        onDragStart={e => this.handleDragStart(e, card)}
      >
        <div className="single-card card" style={{ width: "100%" }}>
          {this.state.editMode ? (
            isUpdatingCardWhileEditing ? (
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
                      value={this.state.newTitle}
                    />
                  </div>
                  <button type="submit" className="col-12 btn btn-secondary">
                    Save
                  </button>
                </form>
              </div>
            )
          ) : (
            <>
              <div className="edit-btn">
                <div
                  className="card-title"
                  className="title-and-modal"
                  onClick={() => this.setModalShow(true)}
                >
                  {card.cardImage !== "none" ? (
                    <img
                      src={card.cardImage}
                      alt="cover"
                      style={{ width: "100%" }}
                    />
                  ) : null}
                  <p className="ow px-3">{title}</p>
                </div>
                <MyModal
                  show={this.state.showModal}
                  onHide={() => this.setModalShow(false)}
                  card={card}
                />
                <EditSVG onClick={this.handleCardEdit} />
              </div>
            </>
          )}
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
