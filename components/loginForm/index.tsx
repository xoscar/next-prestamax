import { FunctionComponent, useMemo } from 'react';
import { Formik, FormikProps } from 'formik';
import formikProps, { LoginFields, LoginValues } from './loginFormFormikProps';
import { InputAdornment, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Container, FormSection, LoginButton } from './loginFormStyled';
import { ActionsContainer } from '../loanForm/loanFormStyled';

export type LoginFormProps = {
  onSubmit(values: LoginValues): void;
};

const LoginForm: FunctionComponent<LoginFormProps> = ({ onSubmit }) => {
  const { initialValues, validate } = useMemo(() => formikProps(), []);

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ values, errors, setFieldValue, submitForm }: FormikProps<LoginValues>) => {
        return (
          <Container>
            <FormSection>
              <TextField
                id="input-with-icon-textfield"
                label="Username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                error={!!errors[LoginFields.USERNAME]}
                helperText={errors[LoginFields.USERNAME]}
                onChange={(event) => {
                  const newValue = event.target.value;
                  setFieldValue(LoginFields.USERNAME, newValue);
                }}
                variant="standard"
                value={values.username}
              />
            </FormSection>
            <FormSection>
              <TextField
                id="input-with-icon-textfield"
                label="Username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                type="password"
                error={!!errors[LoginFields.PASSWORD]}
                helperText={errors[LoginFields.PASSWORD]}
                onChange={(event) => {
                  const newValue = event.target.value;
                  setFieldValue(LoginFields.PASSWORD, newValue);
                }}
                value={values.password}
              />
            </FormSection>
            <ActionsContainer>
              <LoginButton onClick={() => submitForm()}>Login</LoginButton>
            </ActionsContainer>
          </Container>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
