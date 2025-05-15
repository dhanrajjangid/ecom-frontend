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
    h1: { fontWeight: 'bold' },
    h2: { fontWeight: 'bold' },
    h3: { fontWeight: 'bold' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '6px 12px',
          transition: 'all 0.3s ease',
        },
        contained: {
          backgroundColor: '#eb7d38',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#faa748',
          },
          '&:focus': {
            backgroundColor: '#faa748',
            outline: 'none',
          },
          '&:active': {
            backgroundColor: '#d96b2f',
          },
        },
        outlined: {
          border: '1px solid #eb7d38',
          color: '#eb7d38',
          '&:hover': {
            backgroundColor: '#fff3e0',
            borderColor: '#faa748',
            color: '#d96b2f',
          },
          '&:focus': {
            borderColor: '#faa748',
            outline: 'none',
          },
          '&:active': {
            backgroundColor: '#fff0db',
            borderColor: '#d96b2f',
          },
        },
        text: {
          color: '#eb7d38',
          '&:hover': {
            backgroundColor: '#fff3e0',
            color: '#d96b2f',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#eb7d38',
          textDecoration: 'none',
          '&:hover': {
            color: '#d96b2f',
            textDecoration: 'underline',
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
  },
});

export default theme;
