import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";
class Appbar extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Text>
          <Link to="/">Trello Clone</Link>
        </Navbar.Text>
        <Nav className="ml-auto">
          <Navbar.Text className="mr-3">
            <Link to="/signup">Sign Up</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/signin">Sign In</Link>
          </Navbar.Text>
        </Nav>
      </Navbar>
    );
  }
}

export default Appbar;
