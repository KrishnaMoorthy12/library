import styled from 'styled-components';
import Router from 'next/router';

import { BackButton, Container, Heading } from '../components/styled';
import { Details } from './book';

import { gql, useQuery, useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';

export default function addbook() {
  const initialValue = {
    name: '',
    genre: '',
    authorId: ''
  };

  const [formValues, setFormValues] = useState(initialValue);

  const getAuthorsQuery = gql`
    {
      authors {
        name
        id
      }
    }
  `;

  const addBookQuery = gql`
    mutation {
      addBook(
        name: "${formValues.name.trim()}",
        genre: "${formValues.genre.trim()}",
        authorId: "${formValues.authorId}") {
        id
      }
    }
  `;

  const { data }: { data: { authors: Array<IAuthor> } } = useQuery(getAuthorsQuery);
  const [addBook, { data: response }] = useMutation(addBookQuery);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setFormValues(prevVals => ({ ...prevVals, [name]: value }));
  };

  const resetForm = () => {
    setFormValues(initialValue);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (Object.values(formValues).includes('')) {
      return;
    }

    const response = await addBook();
    if (response && response.data.addBook.id) {
      Router.push(`/book?id=${response.data.addBook.id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Add a book</title>
      </Head>
      <Container>
        <Heading>Add Book</Heading>
        <p style={{ textAlign: 'center' }}>Fill all the details to add a new book</p>
        <form onSubmit={handleSubmit}>
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
            <div>
              <Button type='submit'>Submit</Button>
              <Button onClick={resetForm}>Reset</Button>
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

const Button = styled.button`
  background-color: ${props => props.theme.primary.main};
  border: none;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;

  &::focus {
    outline: none;
  }

  &:hover {
    background-color: ${props => props.theme.primary.dark};
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
