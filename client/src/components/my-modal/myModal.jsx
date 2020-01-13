import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {
  updateCardWhenUploadImageASYNC,
  updateCardWhenEditDescriptionASYNC
} from "../../redux/cards/cards.actions";

import { ReactComponent as TitleSVG } from "../../assets/modal/modala.svg";
import { ReactComponent as DescriptionSVG } from "../../assets/modal/modalb.svg";
import { ReactComponent as AttachmentSVG } from "../../assets/modal/modalc.svg";
import { ReactComponent as ActivitiesSVG } from "../../assets/modal/modald.svg";
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

  handleImageUpload = e => {
    e.preventDefault();
    this.props.updateCardWhenUploadImageASYNC(
      this.props.card,
      this.state.multerImage
    );
  };
  handleCardDescription = e => {
    e.preventDefault();
    this.props.updateCardWhenEditDescriptionASYNC(this.props.card, {
      description: this.state.description
    });
    this.setState({ showEdit: false });
  };

  getListName = listId => {
    const list = this.props.lists.filter(list => list._id === listId);
    return list[0].name;
  };

  showEdit() {
    this.setState({ showEdit: true });
  }

  render() {
    const { card, onHide, show, isUpdatingCardWhileUploading } = this.props;
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
                  height="100"
                />
              ) : (
                <img
                  className="col-12"
                  src={`https://via.placeholder.com/500`}
                  alt="cover"
                  height="100"
                />
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-2">
                <AttachmentSVG />
                <strong>Attachment</strong>
                <div className="col-10 pl-3">
                  {isUpdatingCardWhileUploading ? (
                    <div>Uploading...</div>
                  ) : (
                    <div>
                      <form onSubmit={this.handleImageUpload}>
                        <input
                          className="col-4"
                          type="file"
                          onChange={this.handleChange}
                          accept=".jpg, .png, .jpeg"
                        />
                        <button
                          className="offset-5 col-3 btn btn-secondary"
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
              <div className="col-12 mt-2">
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

              <div className="col-12 mt-2">
                <DescriptionSVG />
                <strong>Card Description</strong>
                {this.props.isUpdatingCardWhileEditingDesc ? (
                  <div>Updating...</div>
                ) : (
                  <div className="pl-5">
                    <div className="row">
                      <div className="col-9">
                        <em>{card.description}</em>
                      </div>
                      {this.state.showEdit ? (
                        <div className="col-12">
                          <form onSubmit={this.handleCardDescription}>
                            <input
                              className="col-9"
                              type="textarea"
                              name="description"
                              value={this.state.description}
                              onChange={this.handleDescriptionChange}
                              placeholder="Enter Description"
                            />
                            <button
                              className="col-3 btn btn-secondary"
                              type="submit"
                            >
                              Edit
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="col-3">
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
                )}
              </div>
              <br />

              <div className="col-12">
                <ActivitiesSVG />
                <strong>Activities</strong>
                {/* <p>{card.activities}</p> */}
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
  isUpdatingCardWhileUploading:
    state.board.boardCards.isUpdatingCardWhileUploading,
  lists: state.board.boardLists.lists,
  isUpdatingCardWhileEditingDesc:
    state.board.boardCards.isUpdatingCardWhileEditingDesc
});

const mapDispatchToProps = dispatch => ({
  updateCardWhenUploadImageASYNC: (card, image) =>
    dispatch(updateCardWhenUploadImageASYNC(card, image)),

  updateCardWhenEditDescriptionASYNC: (card, description) =>
    dispatch(updateCardWhenEditDescriptionASYNC(card, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
