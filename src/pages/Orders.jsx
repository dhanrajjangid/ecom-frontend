import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Orders = () => {
  const orders = [
    { id: 1, date: '2025-05-01', status: 'Delivered', total: 50.0 },
    { id: 2, date: '2025-05-05', status: 'Pending', total: 30.0 },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.map((order) => (
        <Box key={order.id} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
          <Typography variant="body1">Order Date: {order.date}</Typography>
          <Typography variant="body1">Status: {order.status}</Typography>
          <Typography variant="body1">Total: ${order.total}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Orders;