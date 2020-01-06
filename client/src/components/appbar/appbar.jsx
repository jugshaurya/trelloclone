import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
// Action Creator
import { signOutUser } from "../../redux/user/user.actions";
// Style Import
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import "./appbar.styles.scss";

class Appbar extends Component {
  handleSignOut = () => {
    this.props.signOutUser(this.props.history);
  };

  render() {
    const { user } = this.props;
    return (
      <nav className="py-2 px-4 d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-left d-flex flex-column text-white">
          <span>Trello</span>
          <span>Clone</span>
        </Link>
        <div className="navbar-right">
          {user ? (
            <>
              {/* <Link to="/profile">
                  <Image
                    src={user.avatarUrl}
                    roundedCircle
                    className="mr-2"
                    style={{ height: 30, width: 30 }}
                  />
                  {user.username}
                </Link>
              </Navbar.Text>
              <Navbar.Text>
                <Button onClick={this.handleSignOut}>Sign Out</Button>
              </Navbar.Text> */}
            </>
          ) : (
            <>
              <Link to="/boards" className="btn bg-white font-weight-bold">
                Boards
              </Link>
              <Link
                to="/signin"
                className="remove-padding btn btn-link text-white"
              >
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-link text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOutUser: history => dispatch(signOutUser(history))
});

export default withRouter(connect(null, mapDispatchToProps)(Appbar));
