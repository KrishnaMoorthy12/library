import Head from 'next/head';
import styled from 'styled-components';

import BookList from '../components/BookList';

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
      <AddButton>+</AddButton>
    </div>
  );
}

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

const AddButton = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  height: 4rem;
  width: 4rem;
  background-color: ${props => props.theme.secondary.main};
  color: #000;
  border-radius: 50%;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 100;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.secondary.dark};
  }
`;
