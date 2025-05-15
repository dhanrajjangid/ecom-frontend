import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts?.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

  useEffect(() => {
    let sorted = [...products];
    if (sortOrder === 'priceLowToHigh') {
      sorted.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortOrder === 'priceHighToLow') {
      sorted.sort((a, b) => b.salePrice - a.salePrice);
    }
    setFilteredProducts(sorted);
  }, [products, sortOrder]);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Explore Our Furniture
        </Typography>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            label="Sort By"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
