import type { NextPage } from 'next';
import LoginForm from '../components/LoginForm/LoginForm';
import { useUser } from '../providers/User/User.provider';
import {
  Container,
  Wrapper,
  Title,
  TitleContainer,
  FormContainer,
} from '../styles/pages/Login.styled';

const LoginPage: NextPage = () => {
  const { onLogin } = useUser();

  return (
    <Wrapper>
      <Container>
        <TitleContainer>
          <Title>PrestaMax</Title>
        </TitleContainer>
        <FormContainer>
          <LoginForm onSubmit={onLogin} />
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default LoginPage;
