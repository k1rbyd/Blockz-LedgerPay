import React, { useState } from 'react';
import "../styles/App.css";
import { TextField, Button, Container, Typography } from '@mui/material';
import { requestMoney } from '../api'; // Import the requestMoney function

const RequestMoney = ({ accessToken }) => {
  const [requestedUser, setRequestedUser] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestMoney = async () => {
    try {
      const response = await requestMoney(accessToken, requestedUser, amount);
      setMessage(response.message); // Set message from the response
    } catch (error) {
      setMessage('Failed to request money. Please try again later.');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Request Money
      </Typography>
      <TextField
        label="Requested User"
        value={requestedUser}
        onChange={(e) => setRequestedUser(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRequestMoney}>
        Request Money
      </Button>

      {message && <Typography variant="body2">{message}</Typography>}
    </Container>
  );
};

export default RequestMoney;