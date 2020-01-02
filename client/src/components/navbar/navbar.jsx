import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

import { Link } from "react-router-dom";
class Appbar extends Component {
  render() {
    const { user } = this.props;
    console.log("from navbar", user);
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Text>
          <Link to="/">Trello Clone</Link>
        </Navbar.Text>
        <Nav className="ml-auto">
          <Navbar.Text className="mr-3">
            <Link to="/boards">Boards</Link>
          </Navbar.Text>
          {user ? (
            <>
              <Navbar.Text className="mr-3">
                <Link to="/profile">
                  <Image
                    src={user.avatarUrl}
                    roundedCircle
                    className="mr-2"
                    style={{ height: 30, width: 30 }}
                  />
                  {user.username}
                </Link>
                {/* <pre>{user}</pre> */}
              </Navbar.Text>
              <Navbar.Text>
                <Link to="/signin">Sign Out</Link>
              </Navbar.Text>
            </>
          ) : (
            <>
              <Navbar.Text className="mr-3">
                <Link to="/signup">Sign Up</Link>
              </Navbar.Text>
              <Navbar.Text>
                <Link to="/signin">Sign In</Link>
              </Navbar.Text>
            </>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default Appbar;
