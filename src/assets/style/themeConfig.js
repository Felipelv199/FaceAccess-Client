import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#272343',
    },
    secondary: {
      main: '#ffa5a5',
    },
    background: {
      default: '#404b69',
    },
    text: {
      main: '#dbedf3',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
    },
    h3: {
      fontFamily: 'Nunito, sans-serif',
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
    },
    button: {
      fontFamily: 'Nunito, sans-serif',
    },
  },
});

export default theme;
