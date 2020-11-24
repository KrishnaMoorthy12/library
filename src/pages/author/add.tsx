import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';
import { gql, useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useState } from 'react';

import { BackButton, Container, Heading } from '../../components/styled';
import { Details } from '../book';

export default function AddABook() {
  const initialValue = {
    name: '',
    sex: '',
    age: '20'
  };

  const [formValues, setFormValues] = useState(initialValue);

  const addAuthorQuery = gql`
    mutation {
      addAuthor(
        name: "${formValues.name.trim()}",
        sex: "${formValues.sex.trim()}",
        age: ${parseInt(formValues.age, 10)}
        ) {
        id
      }
    }
  `;

  const [addAuthor, { data: response }] = useMutation(addAuthorQuery);

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

    const response = await addAuthor();
    if (response && response.data.addAuthor.id) {
      Router.push(`/author?id=${response.data.addAuthor.id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Add an author</title>
      </Head>
      <Container>
        <Heading>Add an author</Heading>
        <p style={{ textAlign: 'center' }}>Fill all the details to add a new author</p>
        <form onSubmit={handleSubmit}>
          <Details>
            <div>
              <Label>Name</Label>
              <Input type='text' name='name' placeholder='Alice' value={formValues.name} onChange={handleChange} />
            </div>
            <div>
              <Label>Genre</Label>
              <Input type='number' name='age' min={5} max={100} value={formValues.age} onChange={handleChange} />
            </div>
            <div>
              <Label>Sex</Label>
              <Select name='sex' value={formValues.sex} onChange={handleChange}>
                <option value=''>Select an gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
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
  transition: all 0.2s;

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
  transition: all 0.2s;

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
  transition: all 0.2s;

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
