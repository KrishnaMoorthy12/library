import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::after, *::before {
      margin: 0;
      padding: 0;
    }

    *::after, *::before {
      content: '';
    }

    body {
      font-family: Inter, sans-serif;
    }
  `;

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  const theme = {
    primary: {
      light: '#5df2d6',
      main: '#00bfa5',
      dark: '#008e76',
      text: '#000'
    },
    dark: {
      light: '#66ffa6',
      main: '#00e676',
      dark: '#00b248',
      text: '#000'
    }
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
