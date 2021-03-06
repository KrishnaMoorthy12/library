import Link from 'next/link';
import styled from 'styled-components';

export default function BookList({ books }: { books: Array<IBook> }) {
  return (
    <List>
      {books.map((book: IBook) => (
        <Link href={{ pathname: '/book', query: { id: book.id } }} key={book.id}>
          <ListItem>
            <div>
              <h2>{book.name}</h2>
              <p>{book.genre}</p>
            </div>
            <p>{book.author.name}</p>
          </ListItem>
        </Link>
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

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1.4rem;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: #222;
  min-height: 5rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.6rem rgba(50, 50, 50, 0.3);
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.primary.light};
    box-shadow: 0 0 0.8rem ${props => props.theme.primary.light};

    & > div > h2,
    & > p {
      color: #000;
      font-weight: 600;
    }
  }

  & > div {
    display: flex;
    flex: 1;
    margin-bottom: 1rem;
  }

  & > div > h2 {
    font-weight: 600;
    font-size: 1.4rem;
    margin-right: auto;
  }

  & > div > p {
    align-self: flex-start;
    margin: 0.3rem;
    background-color: ${props => props.theme.secondary.dark};
    border-radius: 1rem;
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }

  & > p {
    font-size: 0.85rem;
    color: ${props => props.theme.secondary.light};
  }
`;
