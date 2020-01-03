import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

class MyModal extends React.Component {
  state = {
    multerImage: ""
  };

  handleChange = e => {
    this.setState({ multerImage: e.target.files[0] });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.props.uploadImage(this.state.multerImage, this.props.card);
  };

  render() {
    const { card, onHide, show } = this.props;
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
              <form onSubmit={this.onSubmit}>
                <input type="file" onChange={this.handleChange} />
                <button type="submit">Upload</button>
              </form>
              <br />
            </Row>

            <Row className="show-grid"></Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default MyModal;
