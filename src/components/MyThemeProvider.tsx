import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';

const theme = {
  primary: {
    light: '#5df2d6',
    main: '#00bfa5',
    dark: '#008e76',
    text: '#000'
  },
  secondary: {
    light: '#66ffa6',
    main: '#00e676',
    dark: '#00b248',
    text: '#000'
  }
};

const GlobalStyle = createGlobalStyle`
    *, *::after, *::before {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Inter, sans-serif;
      background-color: #000;
      color: #fff;
    }

    a {
      color: ${theme.secondary.light};
      text-decoration: none;
    }
  `;

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' rel='stylesheet' />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
