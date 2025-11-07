import { createTheme, type ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#120112',
    },
    secondary: {
      main: '#f50000',
    },
  },
};


const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#da63da',
    },
    secondary: {
      main: '#c200f5',
    },
  },
};


export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);