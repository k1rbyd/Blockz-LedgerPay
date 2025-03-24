import React, { useState, useEffect, useCallback } from "react";
import "../styles/App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [requestReceiver, setRequestReceiver] = useState("");
  const [requestAmount, setRequestAmount] = useState("");
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Use useCallback to memoize these functions
  const fetchBalance = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transaction/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Failed to fetch balance.");
    }
  }, [token]);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transaction/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions.");
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBalance();
    fetchTransactions();
  }, [token, navigate, fetchBalance, fetchTransactions]);

  const handleSendMoney = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/transaction/transfer`,
        { receiver, amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      fetchBalance();
      fetchTransactions();
      setReceiver("");
      setAmount("");
    } catch (error) {
      console.error("Transaction failed.");
    }
  };

  const handleRequestMoney = async () => {
    try {
      // Send a POST request to request money
      const response = await axios.post(
        `${API_BASE_URL}/transaction/request`,
        {
          receiver: requestReceiver,   // Receiver's username
          amount: parseFloat(requestAmount)  // The amount the user is requesting
        },
        {
          headers: { Authorization: `Bearer ${token}` }  // Include token for authorization
        }
      );
  
      // Show success message upon successful request
      alert(response.data.message);
  
      // Clear the input fields for receiver and amount
      setRequestReceiver("");
      setRequestAmount("");
  
      // Optional: Refetch the transactions or balance if needed
      fetchTransactions();
      fetchBalance();
  
    } catch (error) {
      // Handle any errors (like network issues, invalid inputs, etc.)
      alert(error.response?.data?.message || "Request failed.");
    }
  };

  const handleAddMoney = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/transaction/add_balance`,
        { amount: parseFloat(addMoneyAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      fetchBalance();
      fetchTransactions();
      setAddMoneyAmount("");
    } catch (error) {
      console.error("Failed to add money.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} p={3} boxShadow={3} borderRadius={2} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h5" color="primary">
          Balance: ₭ {balance.toFixed(2)}
        </Typography>

        <Grid container spacing={3} mt={3}>
          {/* Send Money */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Send Money</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Receiver Username"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  type="number"
                  margin="normal"
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSendMoney}
                >
                  Send Money
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Request Money */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Request Money</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label="From (Username)"
                  value={requestReceiver}
                  onChange={(e) => setRequestReceiver(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  type="number"
                  margin="normal"
                  label="Amount"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleRequestMoney}  // Trigger money request on button click
                >
                  Request Money
                </Button>
              </CardContent>
            </Card>
          </Grid>


          {/* Add Money */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Add Money</Typography>
                <TextField
                  fullWidth
                  type="number"
                  margin="normal"
                  label="Amount"
                  value={addMoneyAmount}
                  onChange={(e) => setAddMoneyAmount(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleAddMoney}
                >
                  Add Money
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Transaction History */}
        <Box mt={4}>
          <Typography variant="h6">Transaction History</Typography>
          <Card>
            <CardContent>
              {transactions.length === 0 ? (
                <Typography>No transactions found.</Typography>
              ) : (
                <List>
                  {transactions.map((tx, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={`₹${tx.amount.toFixed(2)} - ${
                            tx.receiver === "kaushik" ? "Received from" : "Sent to"
                          } ${tx.sender}`}
                          secondary={new Date(tx.timestamp).toLocaleString()}
                        />
                      </ListItem>
                      {index !== transactions.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Logout Button */}
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;