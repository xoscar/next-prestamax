import { FunctionComponent } from 'react';
import { Container, Text, Wrapper } from './subHeadingStyled';

export type SubHeadingProps = {
  text: string;
};

const SubHeading: FunctionComponent<SubHeadingProps> = ({ text }) => {
  return (
    <Wrapper>
      <Container>
        <Text>{text}</Text>
      </Container>
    </Wrapper>
  );
};

export default SubHeading;
