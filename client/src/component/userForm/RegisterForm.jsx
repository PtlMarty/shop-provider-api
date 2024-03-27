import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterForm(setCurrentUser) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const body = await response.json();
    if (response.status !== 200) {
      console.log(body);
    } else {
      navigate("/");
      setCurrentUser(body); // Set the current user
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="d-flex justify-content-center">
      <Card className="w-75 p-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="first_name">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group controlId="password_confirmation">
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              autoComplete="on"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-5">
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default RegisterForm;
