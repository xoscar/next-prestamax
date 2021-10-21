import { FunctionComponent } from 'react';
import { Container, Wrapper, Text } from './noMoreItemsStyled';

const NoMoreItems: FunctionComponent = () => {
  return (
    <Wrapper>
      <Container>
        <Text>Fin de la lista.</Text>
      </Container>
    </Wrapper>
  );
};

export default NoMoreItems;
