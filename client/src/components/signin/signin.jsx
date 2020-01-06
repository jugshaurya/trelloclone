import React, { useState } from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { ReactComponent as SignInSVG } from "../../assets/signin.svg";

import { signInUserASYNC } from "../../redux/user/user.actions";
import "./signin.styles.scss";

const SignIn = props => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    props.signInUserASYNC(state.username, state.password, props.history);
  };

  const { username, password } = state;
  const { isSignIn, signInError, signInSuccessMessage } = props;

  return (
    <div id="sign-in" className="container pt-3">
      <div className="row text-center">
        <div className="signin-left col-sm-12 col-md-6">
          {isSignIn ? (
            <Spinner animation="grow" variant="dark" />
          ) : (
            <>
              <h3 className="pb-3 text-lg-middle">Ready to Sign In</h3>
              <div className="alert-box pt-3 pb-3 px-1 text-lg-middle">
                {signInError && (
                  <alert className="alert alert-danger">{signInError}</alert>
                )}
                {signInSuccessMessage && (
                  <alert className="alert alert-success">
                    {signInSuccessMessage}
                  </alert>
                )}
              </div>

              <form className="p-2 px-5 text-md-middle" onSubmit={handleSubmit}>
                <div className="form-group ml-md-3">
                  <label for="username">Username</label>
                  <input
                    id="username"
                    className="form-control"
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    onChange={handleChange}
                    value={username}
                    required
                  />
                </div>
                <div className="form-group ml-md-3">
                  <label for="password">Password</label>
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    value={password}
                    required
                  />
                </div>

                <button className="btn btn-primary px-3" type="submit">
                  Submit
                </button>
              </form>
            </>
          )}
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
