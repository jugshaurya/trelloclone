import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { signUpUserASYNC } from "../../../redux/user/user.actions";

import Spinner from "react-bootstrap/Spinner";

import { ReactComponent as SignUpSVG } from "../../../assets/signup.svg";
import "./signup.styles.scss";

const SignUp = props => {
  const [usercredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarUrl: ""
  });

  const {
    username,
    email,
    password,
    confirmPassword,
    avatarUrl
  } = usercredentials;

  const {
    isSignUp,
    signUpError,
    signUpSuccessMessage,
    history,
    signUpUserASYNC
  } = props;

  const setRandomUrl = () => {
    const randomNumber = Math.floor(1 + Math.random() * 999);
    setUserCredentials({
      ...usercredentials,
      avatarUrl: `https://i.picsum.photos/id/${randomNumber}/1000/1000.jpg`
    });
  };
  // Mimicing ComponentDidMount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...usercredentials, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    signUpUserASYNC(usercredentials, history);
  };

  return (
    <div id="sign-up" className="container pt-3">
      <div className="row text-center">
        <div className="signup-left col-sm-12 col-md-6">
          <>
            <h3 className="pb-2 text-lg-middle">Ready to Sign Up</h3>
            <div className="alert-box pt-2 pb-2 px-1 text-lg-middle">
              {signUpError && (
                <div className="alert alert-danger">{signUpError}</div>
              )}
              {signUpSuccessMessage && (
                <div className="alert alert-success">
                  {signUpSuccessMessage}
                </div>
              )}
            </div>

            <form className="py-2 px-5 text-md-middle" onSubmit={handleSubmit}>
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
                  required
                />
              </div>

              <div className="form-group ml-md-3">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  onChange={handleChange}
                  value={email}
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
                  autoComplete="password"
                  required
                />
              </div>
              <div className="form-group ml-md-3">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  onChange={handleChange}
                  value={confirmPassword}
                  autoComplete="confirm-password"
                  required
                />
              </div>

              <div className="form-group ml-md-3">
                <label htmlFor="avatar-url">Avatar URL</label>
                <input
                  id="avatar-url"
                  className="form-control"
                  type="text"
                  name="avatarUrl"
                  placeholder="Enter Avatar URL"
                  onChange={handleChange}
                  value={avatarUrl}
                  required
                />
                <small className="random-pic" onClick={setRandomUrl}>
                  Get Random Image
                </small>
              </div>

              {isSignUp ? (
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
          </>
        </div>
        <div className="signup-right col-sm-12 col-md-6 pt-2">
          <SignUpSVG />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isSignUp: state.user.isSignUp,
  signUpError: state.user.signUpError,
  signUpSuccessMessage: state.signUpSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  signUpUserASYNC: (userCredentials, history) =>
    dispatch(signUpUserASYNC(userCredentials, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
