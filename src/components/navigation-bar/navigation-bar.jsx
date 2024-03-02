import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, onLogout }) => {
  return (
    <Nav className="ml-auto" style={{ position: "absolute", top: 0, right: 0 }}>
      {!user ? (
        <>
          <Nav.Link as={Link} to="/login" style={{ color: "red" }}>
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/signup" style={{ color: "red" }}>
            Signup
          </Nav.Link>
        </>
      ) : (
        <NavDropdown title="Menu" alignRight style={{ color: "red" }}>
          <NavDropdown.Item as={Link} to="/" style={{ color: "red" }}>
            Home
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/profile" style={{ color: "red" }}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item onClick={onLogout} style={{ color: "red" }}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Nav>
  );
};

export default NavigationBar;
