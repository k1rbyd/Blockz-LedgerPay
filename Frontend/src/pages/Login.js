import React, { useState } from "react";
import axios from "axios";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        alert("OTP sent. Please verify.");
        navigate("/verify-otp", { state: { username } });
      } else {
        setError(response.data.error || "Login failed.");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="password"
            margin="normal"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Typography mt={2}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/register")} color="secondary">
            Register
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;