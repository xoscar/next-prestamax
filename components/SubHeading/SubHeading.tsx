import { Container, Text, Wrapper } from './SubHeading.styled';

interface IProps {
  text: string;
}

const SubHeading = ({ text }: IProps) => {
  return (
    <Wrapper>
      <Container>
        <Text>{text}</Text>
      </Container>
    </Wrapper>
  );
};

export default SubHeading;
