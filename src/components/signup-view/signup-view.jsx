import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signup-view.scss";

export const SignupView = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (formData.username.length < 5) {
      setError("Username must be at least 5 characters long");
      return false;
    }
    
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError("");

    const data = {
      Username: formData.username,
      Password: formData.password,
      Email: formData.email,
      Birthday: formData.birthday
    };

    fetch("https://movieflix-87lf.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        setIsLoading(false);
        
        if (response.ok) {
          setSuccess(true);
          setFormData({
            username: "",
            password: "",
            email: "",
            birthday: ""
          });
          
          // redirects after 3 secs
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Something went wrong. Please try again.");
        console.error("Error: ", error);
      });
  };

  return (
    <div className="signup-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="signup-card">
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Join MovieFlix to discover amazing films</p>
              
              {error && <div className="validation-message text-center mb-3">{error}</div>}
              {success && (
                <div className="success-message">
                  Registration successful! Redirecting to login...
                </div>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="form-group">
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username (min. 5 characters)"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength="5"
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="form-group">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </Form.Group>
                
                <Form.Group controlId="formEmail" className="form-group">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </Form.Group>
                
                <Form.Group controlId="formBirthday" className="form-group">
                  <Form.Label className="form-label">Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="form-control"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="signup-btn"
                  disabled={isLoading || success}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                
                <Link to="/login" className="signup-link">
                  Already have an account? <span>Sign In</span>
                </Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupView;
