import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Backoffice from './components/Backoffice';
import ListaTransportes from './components/ListaTransportes';
import PrivateRoute from './components/PrivateRoute';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import Unauthorized from './components/Unauthorized';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      navigate('/login');
    };

    return (
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Gestión de Transportes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/backoffice">Registrar Transporte</Nav.Link>
              <Nav.Link as={Link} to="/lista-transportes">Ver Transportes</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          {isAuthenticated && <Header />}
          <Container className="flex-grow-1 mt-4">
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/backoffice" element={<PrivateRoute element={<Backoffice />} requiredRole="gestor_logistico" />} />
              <Route path="/lista-transportes" element={<PrivateRoute element={<ListaTransportes />} requiredRole="gestor_logistico" />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/" element={isAuthenticated ? <Navigate to="/backoffice" replace /> : <Navigate to="/login" replace />} />
            </Routes>
          </Container>
          <footer className="mt-auto py-3 bg-light">
            <Container className="text-center">
              <span className="text-muted">© 2024 Gestión de Transportes</span>
            </Container>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
