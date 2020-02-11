import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
// Used for rendering markdowns
import marked from "marked";
import renderHTML from "react-render-html";

import {
  updateCardWhenUploadImageASYNC,
  updateCardWhenEditDescriptionASYNC
} from "../../redux/cards/cards.actions";

import Spinner from "react-bootstrap/Spinner";

import { ReactComponent as TitleSVG } from "../../assets/modal/modala.svg";
import { ReactComponent as DescriptionSVG } from "../../assets/modal/modalb.svg";
import { ReactComponent as AttachmentSVG } from "../../assets/modal/modalc.svg";
import { ReactComponent as ActivitiesSVG } from "../../assets/modal/modald.svg";
import "./myModal.styles.scss";

class MyModal extends React.Component {
  state = {
    multerImage: "",
    description: "",
    showEdit: false
  };

  handleChange = e => {
    this.setState({ multerImage: e.target.files[0] });
  };

  handleDescriptionChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEdit() {
    this.setState({ showEdit: true });
  }

  handleImageUpload = e => {
    const { card, updateCardWhenUploadImageASYNC } = this.props;
    e.preventDefault();
    updateCardWhenUploadImageASYNC(card, this.state.multerImage);
  };

  handleCardDescriptionUpdate = e => {
    const { card, updateCardWhenEditDescriptionASYNC } = this.props;
    e.preventDefault();
    updateCardWhenEditDescriptionASYNC(card, {
      description: this.state.description
    });
    this.setState({ showEdit: false });
  };

  getListName = listId => {
    const { lists } = this.props;
    const list = lists.filter(list => list._id === listId);
    return list[0].name;
  };

  getCardActivities = card => {
    const { activities } = this.props;
    if (!activities) {
      return [];
    }
    let cardActivities = activities.filter(
      activity => activity.cardId === card._id
    );
    return cardActivities;
  };

  showCardDescriptionEditForm = () => {
    const { card } = this.props;
    const { showEdit, description } = this.state;

    return (
      <div className="pl-5">
        <div className="row">
          <div className="col-9">
            <em>{card.description}</em>
          </div>
          {showEdit ? (
            <div className="col-12 ">
              <form onSubmit={this.handleCardDescriptionUpdate}>
                <input
                  className="col-8"
                  type="textarea"
                  name="description"
                  value={description}
                  onChange={this.handleDescriptionChange}
                  placeholder="Enter Description"
                />
                <button
                  className="offset-1 col-3 btn btn-secondary"
                  type="submit"
                >
                  Edit
                </button>
              </form>
            </div>
          ) : (
            <div className="col-3 text-right">
              <button
                className="btn btn-secondary"
                onClick={() => this.showEdit()}
              >
                EDIT
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  sortActivitiesByCreationDate = activities => {
    const toBeSortedActivities = [...activities];
    return toBeSortedActivities.sort((x, y) => {
      if (x.createdAt < y.createdAt) {
        return 1;
      }
      if (x.createdAt > y.createdAt) {
        return -1;
      }
      return 0;
    });
  };

  renderCardActivities = () => {
    const { card, user } = this.props;
    const cardActivities = this.getCardActivities(card);
    const sortedCardActivities = this.sortActivitiesByCreationDate(
      cardActivities
    );
    return sortedCardActivities.map(activity => (
      <div key={activity._id} className="mt-2 mr-3 d-flex ">
        <img
          src={
            activity.userId.avatarUrl
              ? activity.userId.avatarUrl
              : user.avatarUrl
          }
          alt="userPhoto"
          width="50"
          height="50"
          style={{ borderRadius: "50%", marginRight: "1em" }}
        />
        {renderHTML(marked(activity.text))}
      </div>
    ));
  };

  render() {
    const {
      card,
      onHide,
      show,
      isUpdatingCardWhileUploading,
      isUpdatingCardWhileEditingDesc
    } = this.props;

    return (
      <Modal
        id="mymodal"
        onHide={onHide}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="col-12">
              {card.cardImage !== "none" ? (
                <img
                  className="col-12"
                  src={card.cardImage}
                  alt="cover"
                  height="200"
                />
              ) : (
                <img
                  className="col-12"
                  src={`https://via.placeholder.com/1000`}
                  alt="cover"
                  height="200"
                />
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              {/* Modal Image Upload Section */}
              <div className="col-12 mt-2">
                <AttachmentSVG />
                <strong>Attachment</strong>
                <div className="col-12 pl-3 pr-0">
                  {isUpdatingCardWhileUploading ? (
                    <Spinner
                      animation="border"
                      variant="info"
                      className="ml-5 mt-2"
                    />
                  ) : (
                    <div>
                      <form onSubmit={this.handleImageUpload}>
                        <input
                          className="col-6"
                          type="file"
                          onChange={this.handleChange}
                          accept=".jpg, .png, .jpeg"
                        />
                        <button
                          className="offset-2 col-4 btn btn-secondary"
                          type="submit"
                        >
                          Upload
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              <br />
              <br />
              <br />

              {/* Modal Card Info */}
              <div className="col-12 mt-3">
                <TitleSVG />
                <strong>{card.title}</strong>
                <p className="pl-5">
                  in list{" "}
                  <u>
                    <em>
                      <i>{this.getListName(card.listId)}</i>
                    </em>
                  </u>
                </p>
              </div>
              <br />
              <br />

              {/* Modal Card Description */}
              <div className="col-12 mt-2">
                <DescriptionSVG />
                <strong>Card Description</strong>
                {isUpdatingCardWhileEditingDesc ? (
                  <Spinner
                    animation="border"
                    variant="info"
                    className="ml-4 mt-5"
                  />
                ) : (
                  this.showCardDescriptionEditForm()
                )}
              </div>
              <br />

              {/* Modal Card Activities */}
              <div className="col-12">
                <ActivitiesSVG />
                <strong className="mb-4">Activities</strong>
                <br />
                {this.renderCardActivities()}
              </div>
              <br />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  isUpdatingCardWhileUploading:
    state.board.boardCards.isUpdatingCardWhileUploading,
  lists: state.board.boardLists.lists,
  isUpdatingCardWhileEditingDesc:
    state.board.boardCards.isUpdatingCardWhileEditingDesc,
  activities: state.board.activities.activities
});

const mapDispatchToProps = dispatch => ({
  updateCardWhenUploadImageASYNC: (card, image) =>
    dispatch(updateCardWhenUploadImageASYNC(card, image)),

  updateCardWhenEditDescriptionASYNC: (card, description) =>
    dispatch(updateCardWhenEditDescriptionASYNC(card, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
