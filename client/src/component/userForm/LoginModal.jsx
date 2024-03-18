import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function LoginModal() {
  // modal ↓
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    resetForm(); //resets form inputs when modal is closed
  };

  const handleCloseOnLogin = () => setShow(false); //to ensure that inputs are not reset prior to POST

  const handleShow = () => setShow(true);
  // modal ↑

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Button variant="primary" onClick={handleShow} size="lg">
        Log in
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your login info below.</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={() => ""}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                type="password"
                placeholder="password"
              />
              <br />
              <Form.Text className="text-muted">
                Passwords must be between 8 and 16 characters and contain at
                least one number (9), upper case letter (Z), lower case letter
                (a), and symbol (!). Passwords are case sensitive!
              </Form.Text>
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={handleCloseOnLogin}
              >
                Log in
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LoginModal;
