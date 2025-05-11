import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
      light: '#f1f1f1',
      contrastText: '#333',
    },
    background: {
      default: '#fff',
      paper: '#f9f9f9',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
    action: {
      hover: '#f1f1f1',
      active: '#e2e2e2',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '6px 12px',
          transition: 'all 0.3s ease',
        },
        outlined: {
          border: '1px solid #e2e2e2', // Border color for outline button
          color: '#333', // Text color for outline button
          '&:hover': {
            backgroundColor: '#f1f1f1',
            borderColor: '#1a73e8', // Change border color on hover
          },
          '&:focus': {
            borderColor: '#1a73e8', // Focus border color
            outline: 'none',
          },
          '&:active': {
            backgroundColor: '#e2e2e2',
            borderColor: '#1a73e8', // Active border color
          },
        },
        text: {
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        },
        contained: {
          backgroundColor: '#f1f1f1',
          color: '#333',
          '&:hover': {
            backgroundColor: '#e2e2e2',
          },
          '&:focus': {
            backgroundColor: '#e2e2e2',
            outline: 'none',
          },
          '&:active': {
            backgroundColor: '#e2e2e2',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#f1f1f1',
            },
            '&:hover fieldset': {
              borderColor: '#e2e2e2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e2e2e2',
            },
            '&.MuiInputBase-root.MuiFilledInput-root': {
              backgroundColor: '#f9f9f9',
            },
            '&.MuiInputBase-root.MuiInputBase-colorPrimary.MuiFilledInput-root': {
              backgroundColor: '#f9f9f9',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#555',
            '&.Mui-focused': {
              color: '#333',
            },
          },
          '& .MuiInputBase-input': {
            color: '#333',
          },
          '& .MuiInputBase-input.MuiInputBase-colorPrimary.MuiFilledInput-input': {
            color: '#333',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9f9f9',
          border: '1px solid #f1f1f1',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#555',
          textDecoration: 'none',
          '&:hover': {
            color: '#333',
          },
        },
      },
    },
  },
});

export default theme;
