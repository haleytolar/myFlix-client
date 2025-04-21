import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

const NavigationBar = ({ user, onLogout }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="md" className="navigation-bar" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <span className="brand-text">MovieFlix</span>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="main-navbar" 
          className="navbar-toggler"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="ml-auto align-items-center">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link signup-link">
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" className="nav-link">
                  Home
                </Nav.Link>
                
                <NavDropdown 
                  title={
                    <div className="user-menu">
                      <span className="user-name">{user.Username}</span>
                      <i className="fas fa-chevron-down dropdown-icon"></i>
                    </div>
                  } 
                  id="user-dropdown"
                  className="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile" className="dropdown-item">
                    <i className="fas fa-user dropdown-icon"></i> Profile
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item onClick={onLogout} className="dropdown-item logout-item">
                    <i className="fas fa-sign-out-alt dropdown-icon"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;