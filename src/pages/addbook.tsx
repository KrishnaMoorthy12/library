import styled from 'styled-components';

import { BackButton, Container, Heading } from '../components/styled';
import { Details } from './book';

import { gql, useQuery } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import Head from 'next/head';

export default function addbook() {
  const getAuthorsQuery = gql`
    {
      authors {
        name
        id
      }
    }
  `;

  const { loading, data }: { loading: boolean; data: { authors: Array<IAuthor> } } = useQuery(getAuthorsQuery);

  const [formValues, setFormValues] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setFormValues(prevVals => ({ ...prevVals, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>Add a book</title>
      </Head>
      <Container>
        <Heading>Add Book</Heading>
        <p style={{ textAlign: 'center' }}>Fill all the details to add a new book</p>
        <form>
          <Details>
            <div>
              <Label>Name</Label>
              <Input
                type='text'
                name='name'
                placeholder='Alice in Wonderland'
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Genre</Label>
              <Input type='text' name='genre' placeholder='Fantasy' value={formValues.genre} onChange={handleChange} />
            </div>
            <div>
              <Label>Author</Label>
              <Select name='authorId' value={formValues.authorId} onChange={handleChange}>
                <option value=''>Select an author</option>
                {data &&
                  data.authors &&
                  data.authors.map(author => {
                    return (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    );
                  })}
              </Select>
            </div>
          </Details>
        </form>
      </Container>
      <BackButton />
    </>
  );
}

interface IAuthor {
  name: string;
  id: string;
}

const Label = styled.label`
  color: ${props => props.theme.primary.light};
`;

const Input = styled.input`
  padding: 0.4rem 0.6rem;
  border: 1px solid ${props => props.theme.primary.light};
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border-radius: 0.2rem;
  background-color: #222;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:active,
  &:focus {
    border-color: ${props => props.theme.secondary.light};
    box-shadow: 0 0 0.3rem ${props => props.theme.secondary.light};
  }
`;

const Select = styled.select`
  padding: 0.4rem 0.6rem;
  border: 1px solid ${props => props.theme.primary.light};
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border-radius: 0.2rem;
  background-color: #222;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:active,
  &:focus {
    border-color: ${props => props.theme.secondary.light};
    box-shadow: 0 0 0.3rem ${props => props.theme.secondary.light};
  }
`;
