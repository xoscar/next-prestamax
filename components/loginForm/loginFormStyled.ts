import { Button, FormControl, Grid } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Grid).attrs({
  container: true,
})`
  padding: 16px;
`;

export const FormSection = styled(FormControl).attrs({
  variant: 'standard',
})`
  && {
    width: 100%;
    margin-bottom: 34px;
  }
`;

export const LoginButton = styled(Button).attrs({
  variant: 'contained',
})`
  && {
    width: 100px;
    align-self: flex-end;
    background: ${({ theme }) => theme.acceptButtonColor};

    &:hover {
      background: ${({ theme }) => theme.acceptButtonColor};
    }
  }
`;
