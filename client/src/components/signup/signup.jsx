import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { signUpUserASYNC } from "../../redux/user/user.actions";

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

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...usercredentials, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    this.props.signUpUserASYNC(usercredentials, props.history);
  };

  const { isSignUp, signUpError, signUpSuccessMessage } = props;
  return (
    <>
      {isSignUp ? (
        <div className="mt-5">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <Container className="mt-5">
          <h1 className="mb-5">SignUp</h1>
          <Row>
            <Col className="col-4 m-auto">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    onChange={handleChange}
                    value={username}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={password}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={confirmPassword}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicAvatar">
                  <Form.Label>AvatarUrl</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="avatarUrl"
                    placeholder="Avatar Url"
                    onChange={handleChange}
                    value={avatarUrl}
                  />
                </Form.Group>
                {signUpError && <Alert variant="danger">{signUpError}</Alert>}
                {signUpSuccessMessage && (
                  <Alert variant="success">{signUpSuccessMessage}</Alert>
                )}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
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
