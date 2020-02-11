import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { signOutUser } from "../../redux/user/user.actions";

import "./appbar.styles.scss";

class Appbar extends Component {
  render() {
    const { user, history, signOutUser } = this.props;

    return (
      <nav className="py-2 px-4 d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-left d-flex flex-column text-white">
          <span>Trello</span>
          <span>Clone</span>
        </Link>
        <div className="navbar-right text-right">
          {user ? (
            <>
              <Link
                to="/boards"
                className="btn bg-white show-above-md font-weight-bold boards-link"
              >
                Boards
              </Link>
              <Link
                to="/"
                className="profile remove-padding btn btn-link text-white "
              >
                <img src={user.avatarUrl} alt="avatar" className="p-1" />
                {user.username.split(" ")[0]}
              </Link>
              <button
                onClick={() => signOutUser(history)}
                className="btn btn-link text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/boards"
                className="btn bg-white show-above-md font-weight-bold boards-link"
              >
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
