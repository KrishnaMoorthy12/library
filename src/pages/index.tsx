import Head from 'next/head';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: ${props => props.theme.primary.main};
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Library</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading>Hello World</Heading>
    </div>
  );
}
