import Head from 'next/head';
import styled from 'styled-components';

import BookList from '../components/BookList';

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${props => props.theme.primary.main};
`;

const Container = styled.main`
  max-width: 80%;
  margin: 4rem auto;
  font-size: 1rem;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Library</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <Heading>Library</Heading>
        <BookList />
      </Container>
    </div>
  );
}
