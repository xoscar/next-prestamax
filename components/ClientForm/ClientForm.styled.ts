import styled from 'styled-components';
import { Button, Grid } from '@mui/material';

export const Container = styled(Grid).attrs({
  container: true,
  gap: 2,
})`
  margin: 40px 0 60px;
`;

export const FormSection = styled(Grid).attrs({
  variant: 'standard',
  xs: 12,
  md: 5,
})``;

export const ActionsContainer = styled(Grid).attrs({
  container: true,
  gap: 1,
})`
  justify-content: flex-end;
`;

export const SubmitButton = styled(Button).attrs({
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
