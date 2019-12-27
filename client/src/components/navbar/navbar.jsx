import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
class Appbar extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Trello Clone</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          <Nav.Link href="/signin">Sign In</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Appbar;
