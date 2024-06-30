import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/transactions', { type, amount }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAmount('');
    const res = await axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(res.data);
  };

  return (
    <div>
      {user && (
        <>
          <h1>Welcome, {user.username}</h1>
          <p>Wallet Balance: ${user.wallet}</p>
          <form onSubmit={handleTransaction}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Dashboard;
