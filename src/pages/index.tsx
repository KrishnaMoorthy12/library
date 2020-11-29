import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ApolloError, gql } from '@apollo/client';

import { Container, Heading, SubHeading, AddButton } from '../components/styled';
import BookList from '../components/BookList';
import { client } from './_app';

export default function Home({ loading, data }: IBookQueryResult) {
  return (
    <>
      {loading && (
        <>
          <Head>
            <title>Loading</title>
          </Head>
          <SubHeading style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading
          </SubHeading>
        </>
      )}
      {!!data && !!data.error && (
        <Container>
          <Head>
            <title>Error</title>
          </Head>
          <Heading>Error</Heading>
          <p>{JSON.stringify(data.error)}</p>
        </Container>
      )}
      {!!data && !!data.books && (
        <>
          <Head>
            <title>Library</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Container>
            <Heading>Library</Heading>
            <BookList books={data.books} />
          </Container>
          <AddButton />
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { loading, error, data } = await client.query({
    query: getBooksQuery
  });
  return {
    props: { loading, data: error || data }
  };
};

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

interface IBookQueryResult {
  loading: boolean;
  data?: { error?: ApolloError; books?: Array<IBook> };
}

interface IBook {
  id: string;
  name: string;
  genre: string;
  author: {
    name: string;
    id: string;
  };
}
