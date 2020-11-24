import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { AddButton, BackButton, Container, Heading, SubHeading } from '../../components/styled';
import Link from 'next/link';

export default function book() {
  const { query } = useRouter();

  const getBookDetailsQuery = gql`
    {
      book(id: "${query.id}") {
        name,
        genre,
        author {
          id,
          name,
          age,
          sex,
          books {
            name
          }
        }
      }
    }
  `;

  const { loading, error, data }: { loading?: boolean; error?: any; data: { book: IBook } } = useQuery(
    getBookDetailsQuery
  );

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
      {error && (
        <Container>
          <Head>
            <title>Error</title>
          </Head>
          <Heading>Error</Heading>
          <p>{JSON.stringify(error)}</p>
        </Container>
      )}
      {!!data && data.book && (
        <>
          <Container>
            <Head>
              <title>{data.book.name}</title>
            </Head>
            <Heading>{data.book.name}</Heading>
            <Details>
              <Detail>
                <div>Genre</div>
                <div>{data.book.genre}</div>
              </Detail>
              <Detail>
                <div>Author</div>
                <div>
                  <Link href={{ pathname: '/author', query: { id: data.book.author.id } }}>
                    {data.book.author.name}
                  </Link>
                </div>
              </Detail>
            </Details>
          </Container>
          <BackButton />
          <AddButton />
        </>
      )}
    </>
  );
}

interface IAuthor {
  name: string;
  id: string;
  age: number;
  sex: string;
  books: Array<{
    name: string;
  }>;
}

interface IBook {
  name: string;
  genre: string;
  author: IAuthor;
}

const Details = styled.div`
  display: flex;
  max-width: 50%;
  margin: 1rem auto;
  flex-direction: column;

  & > div {
    margin: 1rem 0;
  }

  @media (max-width: 1000px) {
    max-width: 80%;
  }

  @media (max-width: 800px) {
    max-width: 90%;
  }

  @media (max-width: 700px) {
    max-width: 95%;
  }
`;

const Detail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  font-size: 1.4rem;

  & > div:nth-child(odd) {
    /* text-align: right; */
  }
`;

export { Details, Detail };
