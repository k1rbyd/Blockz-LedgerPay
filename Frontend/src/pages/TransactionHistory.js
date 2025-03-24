import React, { useEffect, useState } from 'react';
import "../styles/App.css";
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getTransactionHistory } from '../api'; // Import the getTransactionHistory function

const TransactionHistory = ({ accessToken }) => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const history = await getTransactionHistory(accessToken);
        setTransactions(history);
      } catch (error) {
        setMessage('Failed to fetch transaction history. Please try again later.');
      }
    };
    fetchTransactionHistory();
  }, [accessToken]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Transaction History
      </Typography>
      {message && <Typography variant="body2">{message}</Typography>}
      <List>
        {transactions.length > 0 ? (
          transactions.map((txn) => (
            <ListItem key={txn.id}>
              <ListItemText
                primary={`${
                  txn.type === 'sent' ? 'Sent' : 'Received'
                } ${txn.amount} to/from ${txn.counterparty}`}
                secondary={`On: ${txn.timestamp}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography>No transactions found.</Typography>
        )}
      </List>
    </Container>
  );
};

export default TransactionHistory;