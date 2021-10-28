import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';

export const ModalContent = styled(Grid).attrs({
  sx: {
    boxShadow: 24,
    p: 4,
  },
  xs: 11,
  md: 10,
  lg: 8,
  xl: 6,
  container: true,
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.whiteColor};
`;

export const ModalTitle = styled(Typography).attrs({ variant: 'h5' })``;
