import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movieflix-87lf.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="login-card">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your MovieFlix account</p>
              
              {error && <div className="validation-message text-center mb-3">{error}</div>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="form-group">
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="form-group">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                
                <Link to="/signup" className="login-link">
                  Don't have an account? <span>Sign Up</span>
                </Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginView;
