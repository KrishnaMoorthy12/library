import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MyThemeProvider } from '../components';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/api',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <MyThemeProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </MyThemeProvider>
  );
}

export default MyApp;
