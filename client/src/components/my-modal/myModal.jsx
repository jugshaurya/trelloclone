import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { updateCardWhenUploadImageASYNC } from "../../redux/cards/cards.actions";

class MyModal extends React.Component {
  state = {
    multerImage: ""
  };

  handleChange = e => {
    this.setState({ multerImage: e.target.files[0] });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.props.updateCardWhenUploadImageASYNC(
      this.props.card,
      this.state.multerImage
    );
  };

  render() {
    const { card, onHide, show, isUpdatingCardWhileUploading } = this.props;
    return (
      <Modal
        onHide={onHide}
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            More About Card
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              Card Title: {card.title}
              <br />
              Card Description: {card.description}
              <br />
              Card Labels: {card.labels}
              <br />
              Card Image: {card.cardImage}
              {isUpdatingCardWhileUploading && (
                <form onSubmit={this.onSubmit}>
                  <input type="file" onChange={this.handleChange} />
                  <button type="submit">Upload</button>
                </form>
              )}
              <br />
            </Row>

            <Row className="show-grid"></Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingCardWhileUploading:
    state.board.boardCards.isUpdatingCardWhileUploading
});

const mapDispatchToProps = dispatch => ({
  updateCardWhenUploadImageASYNC: (card, image) =>
    dispatch(updateCardWhenUploadImageASYNC(card, image))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
