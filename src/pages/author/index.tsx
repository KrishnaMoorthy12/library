import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { AddButton, BackButton, Container, Heading, SubHeading } from '../../components/styled';
import { Details, Detail } from '../book';
import Link from 'next/link';

export default function Author() {
  const { query } = useRouter();

  const getAuthorDetailsQuery = gql`
    {
      author(id: "${query.id}") {
        name,
        age,
        sex,
        books {
          id,
          name,
          genre
        }
      }
    }
  `;

  const { loading, error, data }: { loading?: boolean; error?: any; data: { author: IAuthor } } = useQuery(
    getAuthorDetailsQuery
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
      {data && data.author && (
        <Container>
          <Head>
            <title>{data.author.name}</title>
          </Head>
          <Heading>{data.author.name}</Heading>
          <Details>
            <Detail>
              <div>Age</div>
              <div>{data.author.age}</div>
            </Detail>
            <Detail>
              <div>Gender</div>
              <div>{data.author.sex}</div>
            </Detail>
            <SubHeading>Books by {data.author.name}</SubHeading>
            <Detail>
              <div>Name</div>
              <div>Genre</div>
            </Detail>
            {data.author.books.map(book => (
              <Detail key={book.id}>
                <div>
                  <Link href={{ pathname: '/book', query: { id: book.id } }}>{book.name}</Link>
                </div>
                <div>{book.genre}</div>
              </Detail>
            ))}
          </Details>
        </Container>
      )}
      <BackButton />
      <AddButton />
    </>
  );
}

interface IAuthor {
  name: string;
  age: number;
  sex: string;
  books: Array<IBook>;
}

interface IBook {
  id: string;
  name: string;
  genre: string;
}
