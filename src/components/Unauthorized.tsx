import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const Unauthorized: React.FC = () => {
  return (
    <Container>
      <Alert variant="danger">
        No está autorizado para acceder a esta página.
      </Alert>
    </Container>
  );
};

export default Unauthorized;
