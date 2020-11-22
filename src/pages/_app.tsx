import Head from 'next/head';
import { MyThemeProvider } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap' rel='stylesheet' />
      </Head>
      <MyThemeProvider>
        <Component {...pageProps} />
      </MyThemeProvider>
    </>
  );
}

export default MyApp;
