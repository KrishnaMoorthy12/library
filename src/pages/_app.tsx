import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { MyThemeProvider } from '../components';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/api',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <MyThemeProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </MyThemeProvider>
  );
}

export default MyApp;
