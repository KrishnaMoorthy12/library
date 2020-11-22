import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

const getBooksQuery = gql`
  {
    books {
      id
      name
      author {
        name
      }
    }
  }
`;

const List = styled.ul``;

const ListItem = styled.li``;

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  return <List>{data && data.books.map(book => <ListItem key={book.id}>{book.name}</ListItem>)}</List>;
}
