import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Grid, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrdersByuser } from '../services/orderService';
import { FaBox, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user?._id;
        const res = await getOrdersByuser(userId);
        setOrders(res);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Loading your orders...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card sx={{ display: 'flex', flexDirection: 'row', padding: 2, boxShadow: 3, borderRadius: 2, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                {/* Thumbnail of the first product */}
                {order.items[0] && (
                  <CardMedia
                    component="img"
                    alt={order.items[0].product.name}
                    height="120"
                    image={order.items[0].thumbnail}
                    sx={{ objectFit: 'cover', width: 120, marginRight: 2 }}
                  />
                )}

                {/* Content section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                  <Box sx={{ padding: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Order ID: {order._id}
                    </Typography>

                    <Box display={'flex'} justifyContent={'space-between'}>
                      <Box>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Order Date: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Total: ₹{order.amount}
                    </Typography>
                    </Box>
                    <Chip
                      label={order.status}
                      color={'success'}
                      sx={{ marginBottom: 0, p: 0 }}
                    />
                    </Box>

                   

                  </Box>

                  {/* Button to view order details */}
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/order/${order._id}`}
                    
                  >
                    <FaEye />
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Orders;
