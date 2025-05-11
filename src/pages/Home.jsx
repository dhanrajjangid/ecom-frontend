import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);

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

  const displayedProducts = products?.slice(0, 8);

  return (
    <Box>
      <HeroSection />
      <ProductGrid products={displayedProducts} />
    </Box>
  );
};

export default Home;
