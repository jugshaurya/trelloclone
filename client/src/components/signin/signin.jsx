import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const SignIn = props => {
  const [state, setState] = useState({
    username: "",
    password: "",
    isSignInPending: false,
    signInSuccessMessage: null,
    signInError: null
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({
      ...state,
      isSignInPending: true
    });

    const response = await fetch("http://localhost:5000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    setState({ ...state, SignInPending: false });
    if (response.ok && response.status === 200) {
      const { message, token } = await response.json();
      setState({ ...state, signInError: null, signInSuccessMessage: message });
      localStorage.setItem("token", token);
      props.history.push("/");
    } else {
      setState({
        ...state,
        signInError: "Invalid Username or Password",
        signInSuccessMessage: null
      });
    }
  };

  const {
    username,
    password,
    signInError,
    signInSuccessMessage,
    isSignInPending
  } = state;

  return (
    <>
      {isSignInPending ? (
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

export default SignIn;
