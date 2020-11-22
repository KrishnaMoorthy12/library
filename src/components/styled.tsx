import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${props => props.theme.primary.main};
`;

const SubHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 1rem 0;
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

export { Heading, Container, AddButton, SubHeading };