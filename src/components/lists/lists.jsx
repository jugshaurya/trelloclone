import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAllListsInBoardASYNC,
  createListASYNC
} from "../../redux/lists/lists.actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ListLayout from "../list-layout/listLayout";

import "./lists.styles.scss";

class Lists extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.props.getAllListsInBoardASYNC();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createListASYNC(this.state.name);
    this.setState({ name: "" });
  };

  renderCreateListForm = () => {
    return this.props.isCreatingList ? (
      <Spinner animation="border" variant="info" className="mt-5" />
    ) : (
      <div className="card list-card text-white bg-dark mb-3">
        <Form onSubmit={this.handleSubmit} className="col-12 pa-5">
          <Form.Label>Create List</Form.Label>
          <Form.Group controlId="formBasicListname">
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Enter List name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </Form.Group>
          <Button variant="primary" className="col-12" type="submit">
            Create List
          </Button>
        </Form>
      </div>
    );
  };

  render() {
    const { isFetchingLists, lists } = this.props;

    return (
      <div className="col-12 p-3">
        {isFetchingLists ? (
          <div className="row">
            <div className="col">
              <Spinner animation="border" variant="info" />
            </div>
          </div>
        ) : (
          <div className="row ">
            <div
              className="col scrolling-wrapper"
              style={{ height: "84vh", paddingRight: "400px" }}
            >
              {/* Render all the lists in board */}
              {lists &&
                lists.map(list => <ListLayout list={list} key={list._id} />)}
              {this.renderCreateListForm()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.board.boardLists.lists,
  isFetchingLists: state.board.boardLists.isFetchingLists,
  isCreatingList: state.board.boardLists.isCreatingList
});

const mapDispatchToProps = dispatch => ({
  getAllListsInBoardASYNC: () => dispatch(getAllListsInBoardASYNC()),
  createListASYNC: name => dispatch(createListASYNC(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
