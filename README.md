# Blockz - UPI Transaction Simulation

## Introduction
**Blockz** is a simulated **UPI (Unified Payments Interface) transaction system** that allows users to register, log in, send money, and check transaction history. It incorporates **secure authentication, real-time balance management, and transaction tracking** to mimic real-world online banking experiences.

## Features
- **User Authentication** (Register/Login)
- **Secure Money Transfers** between users
- **Balance Inquiry**
- **Transaction History Tracking**
- **OTP Verification for Security**
- **Dark Mode & Light Mode Support**
- **Responsive UI with Bootstrap**

## Tech Stack
- **Backend:** Flask, Flask-JWT-Extended, Flask-SQLAlchemy, Flask-Bcrypt, SQLite
- **Frontend:** React, Bootstrap, CSS
- **Authentication:** JWT Tokens

## Installation
### Prerequisites
- Python 3.12+
- Node.js & npm
- Virtual Environment (`venv`)

### Backend Setup
```sh
# Clone the repository
git clone https://github.com/yourusername/blockz-transaction-simulator.git
cd blockz-transaction-simulator/backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python run.py
```

### Frontend Setup
```sh
cd ../frontend

# Install dependencies
npm install

# Start the React app
npm start
```

## API Endpoints
### 1️⃣ Register a New User
**POST** `/auth/register`
```sh
curl -X POST http://127.0.0.1:5001/auth/register \ 
     -H "Content-Type: application/json" \ 
     -d '{"username": "someuser", "password": "somesecurepassword", "phone_number": "9876543210"}'
```
**Response:**
```json
{ "message": "User registered successfully" }
```

### 2️⃣ Login
**POST** `/auth/login`
```sh
curl -X POST http://127.0.0.1:5001/auth/login \ 
     -H "Content-Type: application/json" \ 
     -d '{"username": "someuser", "password": "somesecurepassword"}'
```
**Response:**
```json
{ "access_token": "your-jwt-token-here", "message": "Login successful" }
```

### 3️⃣ Send Money
**POST** `/transaction/transfer`
```sh
curl -X POST http://127.0.0.1:5001/transaction/transfer \ 
     -H "Content-Type: application/json" \ 
     -H "Authorization: Bearer your-jwt-token-here" \ 
     -d '{"receiver": "receiveruser", "amount": 200}'
```
**Response:**
```json
{ "message": "Transaction successful", "transaction_id": "abc123xyz" }
```

### 4️⃣ Check Balance
**GET** `/user/balance`
```sh
curl -X GET http://127.0.0.1:5001/user/balance \ 
     -H "Authorization: Bearer your-jwt-token-here"
```
**Response:**
```json
{ "balance": 5000.0 }
```

### 5️⃣ View Transaction History
**GET** `/transaction/history`
```sh
curl -X GET http://127.0.0.1:5001/transaction/history \ 
     -H "Authorization: Bearer your-jwt-token-here"
```
**Response:**
```json
{
  "transactions": [
    {
      "transaction_id": "abc123xyz",
      "sender": "someuser",
      "receiver": "receiveruser",
      "amount": 200,
      "timestamp": "2025-03-24T12:30:45"
    }
