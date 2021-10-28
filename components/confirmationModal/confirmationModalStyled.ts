import { Button, Grid, Typography } from '@mui/material';
import styled from 'styled-components';

export const ModalContent = styled(Grid).attrs({
  sx: {
    boxShadow: 24,
    p: 4,
  },
  xs: 11,
  md: 6,
  xl: 4,
  container: true,
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.whiteColor};
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled(Typography).attrs({ variant: 'h5' })`
  margin-bottom: 24px;
`;

export const ConfirmButton = styled(Button).attrs({
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

export const Message = styled(Typography).attrs({
  variant: 'body2',
})`
  margin-bottom: 24px;
`;
