import React, { useState } from "react";
import axios from "axios";
import "../styles/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  if (!username) {
    navigate("/login");
    return null;
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify_otp`, {
        username,
        otp,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        setError(response.data.error || "Invalid OTP.");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Verify OTP
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleVerifyOTP}>
          <TextField
            fullWidth
            margin="normal"
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Verify OTP
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default VerifyOTP;