import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { signInUserASYNC } from "../../redux/user/user.actions";

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
    <>
      {console.log(props)}
      {isSignIn ? (
        <Spinner animation="grow" variant="dark" />
      ) : (
        <Container className="mt-5">
          <h1 className="mb-5">Sign In</h1>
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
                {signInError && <Alert variant="danger">{signInError}</Alert>}
                {signInSuccessMessage && (
                  <Alert variant="success">{signInSuccessMessage}</Alert>
                )}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2">
              <Link to="/signup">New? Create Account</Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
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
