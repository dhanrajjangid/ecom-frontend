// pages/OrderDetails.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Divider, Grid, Card, CardMedia, Button, Chip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails } from '../services/orderService';
import { FaCheckCircle, FaTimesCircle, FaCreditCard, FaCartPlus } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const OrderDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await getOrderDetails(id);
                setOrder(res);
            } catch (err) {
                console.error('Error fetching order details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <Box textAlign="center" mt={10}>
                <CircularProgress />
                <Typography mt={2}>Loading order details...</Typography>
            </Box>
        );
    }

    if (!order) {
        return (
            <Box textAlign="center" mt={10}>
                <Typography variant="h6">Order not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Order Details
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ boxShadow: 6, borderRadius: 3, p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" fontWeight="bold">
                                Order ID:
                            </Typography>
                            <Typography variant='p'>
                                {order._id}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            <FaCreditCard style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Payment: {order.status}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            <MdDateRange style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Date: {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            Items
                        </Typography>

                        {order.items.map((item, idx) => (
                            <Box key={idx} sx={{ display: 'flex', mb: 2, alignItems: 'center', boxShadow: 1, p: 2, borderRadius: 2 }}>
                                {item.product.thumbnail && (
                                    <CardMedia
                                        component="img"
                                        alt={item.product.name}
                                        image={item.product.thumbnail}
                                        sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2, borderRadius: 2 }}
                                    />
                                )}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Qty: {item.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ₹{item.price}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total: ₹{item.total}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" fontWeight="bold">Total Amount: ₹{order.amount}</Typography>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={() => navigate('/orders')}>
                                Go Back to Orders
                            </Button>
                        </Box>
                    </Card>
                </Grid>

                {/* Optionally, you can add more Grid elements for other sections if needed */}
            </Grid>
        </Box>
    );
};

export default OrderDetails;
