import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title }) => {
  return (
    <Box sx={{ py: 8, px: { xs: 4, md: 4 } }}>
      {title && <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>{title}</Typography>}
      <Grid container spacing={2} sx={{display: 'flex', justifyContent:'center'}}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;