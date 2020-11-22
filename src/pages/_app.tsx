import Head from 'next/head';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MyThemeProvider } from '../components';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/api',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap' rel='stylesheet' />
      </Head>
      <MyThemeProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MyThemeProvider>
    </>
  );
}

export default MyApp;
