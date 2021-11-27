import { createTheme } from '@mui/material';

const theme = createTheme({
  shadow: '5px 5px 15px 5px #080808',
  margin: {
    element: '3em auto 3em auto',
    icon: '0.2em 0.2em 0.2em 0'
  },
  padding: {
    element: '2em'
  },
  palette: {
    type: 'dark',
    title: {
      component: '#FF9633',
      subtitle: '#FFB570'
    },
    background: {
      dark: '#101010',
      main: '#141414',
      component: '#181818',
      light: '#242424',
      opaqueLight: 'rgba(36, 36, 36, 0.7);'
    },
    primary: {
      main: '#FF7F04',
      text: '#BDBDBD'
    },
    secondary: {
      main: '#e20032'
    }
  }
});

export default theme;
