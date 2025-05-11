import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Rating } from '@mui/material';
import { useCart } from '../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from '../components/ProductCard';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService'; // Assuming you have an API service

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id); // Fetch product details by id
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToWishlist = () => {
    // You can implement wishlist logic here
  };

  if (!product) {
    return <Typography variant="h6">Loading product details...</Typography>; // Show loading if data is not yet available
  }

  return (
    <Box maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{xs: 12,  md:6}} sx={{ height: { xs: '280px', md: '500px' } }}>
          <Box sx={{ height: '100%', width: '100%' }}>
            <Swiper spaceBetween={10} loop slidesPerView={1} style={{ height: '100%', width: '100%' }}>
              {product?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Product ${product.name} image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>

        <Grid size={{xs: 12,  md:6}} sx={{
          minHeight: { md: '500px' },
          backgroundColor: '#fafafa',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          p: 3,
        }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={product.rating || 0}
                  readOnly
                  precision={0.5}
                  icon={<BsStarFill style={{ color: '#FFD700' }} />}
                  emptyIcon={<BsStarHalf style={{ color: '#FFD700' }} />}
                  sx={{ mr: 2 }}
                />
                <Typography variant="body2" color="textSecondary">
                  {product?.reviews?.length || 0} reviews
                </Typography>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#4caf50' }}>
                ₹{product.salePrice} <span style={{ textDecoration: 'line-through', fontSize: '0.875rem' }}>₹{product.price}</span>
              </Typography>
            </Box>

            <Box sx={{ mt: 4, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Product Details
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Material: {product.material}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Dimensions: {`${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height}`} inches
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Care Instructions: {product.careInstructions}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                onClick={handleAddToWishlist}
                variant="contained"
                sx={{
                  backgroundColor: '#e0e0e0',
                  '&:hover': { backgroundColor: '#d32f2f', color: 'white' },
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  py: 1.5,
                  px: 0,
                  borderRadius: '8px',
                  textTransform: 'none',
                  flexGrow: 1
                }}
              >
                <FaHeart size={22} />
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                startIcon={<FaShoppingCart />}
                sx={{
                  backgroundColor: '#FF4081',
                  '&:hover': { backgroundColor: '#f50057' },
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  py: 1.5,
                  px: 3,
                  borderRadius: '8px',
                  textTransform: 'none',
                  flexGrow: 7
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
          Related Products
        </Typography>
        <Grid container spacing={4}>
          {/* {product?.relatedProducts && [1,2].map((relatedProduct) => (
            <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
              <ProductCard product={relatedProduct} />
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetail;
