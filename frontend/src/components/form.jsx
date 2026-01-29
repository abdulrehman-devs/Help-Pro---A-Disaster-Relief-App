import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const SingleForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(type.toUpperCase(), formData);
    alert(`${type.toUpperCase()} submitted!`);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <Card.Title className="text-center">
          {type === "signup" ? "Sign Up" : "Sign In"}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          {type === "signup" && (
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant={type === "signup" ? "success" : "primary"} className="w-100">
            {type === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SingleForm;
