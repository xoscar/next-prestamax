import { InputAdornment, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Container, FormSection, LoginButton } from './LoginForm.styled';
import { ActionsContainer } from '../LoanForm/LoanForm.styled';
import useLoginForm, { TLoginValues } from './hooks/useLoginForm';

interface IProps {
  onSubmit(values: TLoginValues): void;
}

const LoginForm = ({ onSubmit }: IProps) => {
  const { handleSubmit, errors, values, handleChange } = useLoginForm({ onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <FormSection>
          <TextField
            label="Username"
            InputProps={{
              name: 'username',
              id: 'username',
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            error={!!errors.username}
            helperText={errors.username}
            onChange={handleChange}
            variant="standard"
            value={values.username}
          />
        </FormSection>
        <FormSection>
          <TextField
            id="input-with-icon-textfield"
            label="Password"
            InputProps={{
              name: 'password',
              id: 'password',
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
            onChange={handleChange}
            value={values.password}
          />
        </FormSection>
        <ActionsContainer>
          <LoginButton type="submit">Login</LoginButton>
        </ActionsContainer>
      </Container>
    </form>
  );
};

export default LoginForm;
