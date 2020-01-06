import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
// Action Creator
import { signOutUser } from "../../redux/user/user.actions";
// Style Import
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
              <Link to="/boards" className="btn bg-white font-weight-bold">
                Boards
              </Link>
              <Link
                to="/"
                className="profile remove-padding btn btn-link text-white "
              >
                <img src={user.avatarUrl} alt="avatar" className="p-1" />
                {user.username}
              </Link>
              <button
                onClick={this.handleSignOut}
                className="btn btn-link text-white"
              >
                Sign Out
              </button>
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
