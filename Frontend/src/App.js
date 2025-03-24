import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Navbar, Nav } from 'react-bootstrap'; // Added Navbar
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import Dashboard from './pages/Dashboard';
import RequestMoney from './pages/RequestMoney';
import TransactionHistory from './pages/TransactionHistory';
import './styles/App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Router>
      {/* Navbar with Dark Mode Toggle */}
      <Navbar bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Blockz - The Simulator</Navbar.Brand>
          <Nav className="ml-auto">
            <Button
              variant={isDarkMode ? "light" : "dark"}
              onClick={toggleDarkMode}
              className="ml-auto"
            >
              {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-money" element={<RequestMoney />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

const Home = () => (
  <Container className="text-center mt-5">
    <Row className="justify-content-center">
      <Col md={8}>
        <h2 className="mb-4">Welcome to the Simulator</h2>
      </Col>
    </Row>
    
    <Row className="justify-content-center">
      <Col xs={12} md={4} className="mb-3">
        <Button variant="primary" size="lg" block as={Link} to="/register">
          Register
        </Button>
      </Col>
      <Col xs={12} md={4} className="mb-3">
        <Button variant="outline-secondary" size="lg" block as={Link} to="/login">
          Login
        </Button>
      </Col>
    </Row>
  </Container>
);

export default App;