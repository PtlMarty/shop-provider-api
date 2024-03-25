import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  // modal state
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    resetForm(); // Resets form inputs when modal is closed
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginInfo = {
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const user = await response.json();
      if (!user.errors) {
        localStorage.uid = user.uid;
        setCurrentUser(user.id);
        window.alert(`User # ${user.id} successfully logged in!`);
        navigate("/"); // Redirects to home page after successful login
      } else {
        user.errors.forEach((error) => window.alert(error));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            type="email"
            placeholder="name@example.com"
            autoFocus
            autoComplete="on"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="password"
            value={password}
            autoComplete="on"
          />
          <br />
          <Form.Text className="text-muted">
            Passwords must be between 8 and 16 characters and contain at least
            one number (9), upper case letter (Z), lower case letter (a), and
            symbol (!). Passwords are case sensitive!
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
