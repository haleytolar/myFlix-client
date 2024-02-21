import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://movieflix-87lf.onrender.com/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            console.log(data)
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else if (username.length < 5) {
                alert("Username must be 5 characters or longer.");
            } else if (password === "") {
                alert("You have to enter a password.");
            } else if (email.includes("@") === false) {
                alert("Please enter a valid email address.")
            }else {
                alert("Signup failed");
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-5">
          <Form.Label style={{ color: "white" }}>Register:</Form.Label>
          <Form.Group controlId="formUsername">
            <Form.Label style={{ color: "white" }}>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="8"
            />
          </Form.Group>
    
          <Form.Group controlId="formPassword">
            <Form.Label style={{ color: "white" }}>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </Form.Group>
            <Form.Group controlId="formEmail">
      <Form.Label style={{ color: "white" }}>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
                <Form.Label style={{ color: "white" }}>Birthday:</Form.Label>
                <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit} className="mt-2" style={{ backgroundColor: "red" }}>Submit</Button>
    </Form>
  );
};
