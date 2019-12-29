import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const SignUp = props => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",
    isSignUpPending: false,
    signupSuccessMessage: null,
    signupError: null
  });

  const {
    isSignUpPending,
    username,
    email,
    password,
    confirmPassword,
    avatarUrl,
    signupError,
    signupSuccessMessage
  } = state;

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Checking Passwords matches
    if (password !== confirmPassword) {
      return setState({ ...state, signupError: "Passwords don't Match" });
    }

    setState({
      ...state,
      isSignUpPending: true
    });

    const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        confirmPassword,
        email,
        avatarUrl
      })
    });

    const { message } = await response.json();
    setState({ ...state, isSignUpPending: false });
    if (!response.ok || !response.status === 201) {
      setState({ ...state, signupError: message, signupSuccessMessage: null });
    } else {
      setState({ ...state, signupError: null, signupSuccessMessage: message });
      props.history.push("/signin");
    }
  };

  return (
    <>
      {isSignUpPending ? (
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
                {signupError && <Alert variant="danger">{signupError}</Alert>}
                {signupSuccessMessage && (
                  <Alert variant="success">{signupSuccessMessage}</Alert>
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

export default SignUp;
