import PropTypes from "prop-types";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function NavBar({ currentUser, handleLogout }) {
  const navigate = useNavigate();

  const handleNewShopClick = () => {
    navigate("/shops/new");
  };

  const handleNewLoginClick = () => {
    navigate("/login");
  };

  const handleDasboardClick = () => {
    navigate("/dashboard");
  };

  const handleNewUserClick = () => {
    navigate("/register");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Shop provider</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/shops">Shops</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleNewShopClick}>
                  {currentUser && currentUser.last_name && (
                    <span>New Shop</span>
                  )}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {currentUser && currentUser.last_name ? (
                  <NavDropdown.Item onClick={handleDasboardClick}>
                    <span>Dasboard</span>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item onClick={handleNewLoginClick}>
                    <span>Login</span>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                {currentUser && currentUser.last_name ? (
                  <NavDropdown.Item>
                    <span>Profile</span>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item onClick={handleNewUserClick}>
                    <span>Register</span>
                  </NavDropdown.Item>
                )}
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
