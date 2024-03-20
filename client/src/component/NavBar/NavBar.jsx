import PropTypes from "prop-types";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar({ currentUser, handleLogout }) {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Shop provider</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Shops</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {currentUser && currentUser.last_name ? (
                    <span>{currentUser.last_name}</span>
                  ) : (
                    <>
                      <Link to="/login">Login</Link>
                    </>
                  )}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  {currentUser && currentUser.last_name ? (
                    <span>{currentUser.last_name}</span>
                  ) : (
                    <>
                      <Link to="/register">SignUp</Link>
                    </>
                  )}
                </NavDropdown.Item>
                {currentUser && currentUser.last_name && (
                  <NavDropdown.Item>
                    <Button onClick={handleLogout}>Logout</Button>
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

NavBar.propTypes = {
  currentUser: PropTypes.shape({
    last_name: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
};

export default NavBar;
