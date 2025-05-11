import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { InputBase, Box, List, ListItem, ListItemText } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/productService';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await searchProducts(query)
        setSuggestions(response);
        setOpen(true);
      } catch (err) {
        console.error('Search error:', err);
        setSuggestions([]);
      }
    };

    console.log(suggestions)

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product) => {
    navigate(`/product/${product._id}`);
    setQuery('');
    setOpen(false);
  };

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', display: 'flex', alignItems: 'center', width: 250 }}>
      <FaSearch style={{ marginRight: 8 }} />
      <InputBase
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: 1,
          px: 1,
          py: 0.5,
        }}
      />

      {open && suggestions?.length > 0 && (
        <List
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderTop: 'none',
            maxHeight: 250,
            overflowY: 'auto',
          }}
        >
          {suggestions.map((product) => (
            <ListItem button key={product._id} onClick={() => handleSelect(product)}>
              <ListItemText primary={product.name} secondary={`₹${product.price}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
