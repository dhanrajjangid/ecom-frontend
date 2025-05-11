import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
        width: {
          xs: '100%',
          sm: '250px',
          md: '250px',
        },
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
      }}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <CardMedia
        component="img"
        image={product.thumbnail || 'https://via.placeholder.com/300'}
        alt={product.name}
        sx={{
          height: {
            xs: '150px',
            sm: '200px',
            md: '200px',
          },
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <CardContent
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 0,
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '200px',
          }}
        >
          {product.name}
        </Typography>
        <div>
          <Typography variant="body2" color="error" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
            ₹{product.salePrice && Number(product.salePrice)?.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textDecoration: 'line-through' }}>
            ₹{product.price && Number(product.price)?.toFixed(2)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
