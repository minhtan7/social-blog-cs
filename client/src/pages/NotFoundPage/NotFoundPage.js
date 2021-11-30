import React from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function NotFoundPage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/" />;
  return (
    <Container
      fluid
      className="d-flex min-vh-100 bg-primary align-items-center justify-content-center"
    >
      <h1>Not found</h1>
    </Container>
  );
}
