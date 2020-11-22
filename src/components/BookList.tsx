import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

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

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.4rem;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
  background-color: #222;
  min-height: 5rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.6rem rgba(50, 50, 50, 0.3);
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.primary.light};
    box-shadow: 0 0 0.8rem ${props => props.theme.primary.light};

    & > h2,
    & > p {
      color: #000;
      font-weight: 600;
    }
  }

  & > h2 {
    font-weight: 600;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  & > p {
    font-size: 0.8rem;
    color: ${props => props.theme.secondary.dark};
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  return (
    <List>
      {data &&
        data.books.map((book: IBook) => (
          <ListItem key={book.id}>
            <h2>{book.name}</h2>
            <p>{book.author.name}</p>
          </ListItem>
        ))}
    </List>
  );
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
