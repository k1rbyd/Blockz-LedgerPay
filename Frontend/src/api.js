import axios from 'axios';

// Set the base URL for your API
const API_URL = 'http://127.0.0.1:5001';

// Set up Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get Transaction History
export const getTransactionHistory = async (accessToken) => {
  try {
    const response = await axiosInstance.get('/transaction/history', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // Return the transaction history
  } catch (error) {
    console.error('Error fetching transaction history', error);
    throw error;
  }
};

// Request Money
export const requestMoney = async (accessToken, requestedUser, amount) => {
  try {
    const response = await axiosInstance.post(
      '/transaction/request',
      { requested_user: requestedUser, amount: amount },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Return the response from the API
  } catch (error) {
    console.error('Error requesting money', error);
    throw error;
  }
};

// Add Money to Account
export const addBalance = async (accessToken, amount) => {
  try {
    const response = await axiosInstance.post(
      '/transaction/add_balance',
      { amount: amount },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Return the response from the API
  } catch (error) {
    console.error('Error adding balance', error);
    throw error;
  }
};