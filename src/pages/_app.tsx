import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { MyThemeProvider } from '../components';

export const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/api',
  cache: new InMemoryCache()
});

export default function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <MyThemeProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </MyThemeProvider>
  );
}
