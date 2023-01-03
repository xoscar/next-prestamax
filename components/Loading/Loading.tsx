import { LinearProgress } from '@mui/material';
import { FunctionComponent } from 'react';
import { Container, Text, Wrapper, LoadingContainer } from './Loading.styled';

const Loading: FunctionComponent = () => {
  return (
    <Wrapper>
      <LoadingContainer>
        <Container>
          <Text>Cargando</Text>
          <div>
            <LinearProgress />
          </div>
        </Container>
      </LoadingContainer>
    </Wrapper>
  );
};

export default Loading;
