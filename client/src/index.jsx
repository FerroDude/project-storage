import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
