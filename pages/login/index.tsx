import type { NextPage } from 'next';
import { useCallback } from 'react';
import LoginForm from '../../components/loginForm';
import { LoginValues } from '../../components/loginForm/loginFormFormikProps';
import { loginUser } from '../../reducers/UserReducer';
import { useAppDispatch } from '../../tools/configureStore';
import {
  Container,
  Wrapper,
  Title,
  TitleContainer,
  FormContainer,
} from '../../styles/pages/loginPageStyled';

const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: LoginValues) => {
      dispatch(loginUser(values));
    },
    [dispatch],
  );

  return (
    <Wrapper>
      <Container>
        <TitleContainer>
          <Title>PrestaMax</Title>
        </TitleContainer>
        <FormContainer>
          <LoginForm onSubmit={onSubmit} />
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default LoginPage;
