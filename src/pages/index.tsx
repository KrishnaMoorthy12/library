import Head from 'next/head';

import BookList from '../components/BookList';
import { Heading, Container, AddButton } from '../components/styled';

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
      <AddButton />
    </div>
  );
}
