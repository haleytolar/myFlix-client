import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

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
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-5">
      <Form.Label style={{ color: "white", fontSize: "1.5em", fontWeight: "bold" }}>
        Login:
      </Form.Label>
      <Form.Group controlId="formUsername">
        <Form.Label style={{ color: "white" }}>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          style={{ backgroundColor: "white", color: "black" }}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label style={{ color: "white" }}>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ backgroundColor: "white", color: "black" }}
        />
      </Form.Group>
      <Button
        type="submit"
        className="mt-2"
        style={{ backgroundColor: "red", border: "none" }}
      >
        Submit
      </Button>
    </Form>
  );
};
