import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Made for every day, for everyone.',
    subtitle: 'As seen on Webflow Conf',
    image: 'https://images.pexels.com/photos/4554414/pexels-photo-4554414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'Furniture that fits your lifestyle',
    subtitle: 'Style + Comfort + Quality',
    image: 'https://images.pexels.com/photos/4554375/pexels-photo-4554375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const HeroSection = () => {
  return (
    <Box sx={{ px: { xs: 0, md: 0 }, height: { xs: '280px', md: '460px' }, overflow: 'hidden' }}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        loop
        pagination={{ clickable: true }}
        style={{ height: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src={slide.image}
                alt="Hero Slide"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  p: { xs: 2, md: 6 },
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  borderRadius: '8px',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: 20, md: 28 },
                    fontWeight: 'bold',
                    mb: 1,
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: { xs: 14, md: 18 },
                    mb: 2,
                  }}
                >
                  {slide.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#ffffff',
                    color: '#000',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSection;
