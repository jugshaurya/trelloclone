import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { signInUserASYNC } from "../../../redux/user/user.actions";

import Spinner from "react-bootstrap/Spinner";

import { ReactComponent as SignInSVG } from "../../../assets/signin.svg";
import "./signin.styles.scss";

const SignIn = props => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const { username, password } = state;

  const {
    isSignIn,
    signInError,
    signInSuccessMessage,
    history,
    signInUserASYNC
  } = props;

  // Mimicing ComponentDidMount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    signInUserASYNC(state.username, state.password, history);
  };

  return (
    <div id="sign-in" className="container pt-3">
      <div className="row text-center">
        <div className="signin-left col-sm-12 col-md-6">
          <h3 className="pb-3 text-lg-middle">Ready to Sign In</h3>
          <div className="alert-box pt-3 pb-3 px-1 text-lg-middle">
            {signInError && (
              <div className="alert alert-danger">{signInError}</div>
            )}
            {signInSuccessMessage && (
              <div className="alert alert-success">{signInSuccessMessage}</div>
            )}
          </div>

          <form className="p-2 px-5 text-md-middle" onSubmit={handleSubmit}>
            <div className="form-group ml-md-3">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="form-control"
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
                value={username}
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group ml-md-3">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={password}
                autoComplete="current-password"
                required
              />
            </div>

            {isSignIn ? (
              <button
                className="btn btn-primary px-5 py-1"
                type="button"
                disabled
              >
                <Spinner animation="border" variant="dark" />
              </button>
            ) : (
              <button className="btn btn-primary px-3" type="submit">
                Submit
              </button>
            )}
          </form>
        </div>
        <div className="signin-right col-sm-12 col-md-6 pt-2">
          <SignInSVG />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isSignIn: state.user.isSignIn,
  signInError: state.user.signInError,
  signInSuccessMessage: state.signInSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  signInUserASYNC: (username, password, history) =>
    dispatch(signInUserASYNC(username, password, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
