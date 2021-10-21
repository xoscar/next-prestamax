import { Button, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const Container = styled(Box)`
  width: 100%;
  padding: 24px;
`;

export const FormSection = styled(FormControl).attrs({
  variant: 'standard',
})`
  && {
    margin-bottom: 25px;
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
