import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled(Grid).attrs({
  xs: 12,
  lg: 10,
  container: true,
})`
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 0 24px;
  justify-content: center;
`;

export const Container = styled(Grid).attrs({
  xs: 12,
})`
  justify-content: center;
`;

export const Text = styled(Typography).attrs({
  variant: 'h6',
})`
  color: ${({ theme }) => theme.subTextColor};
  text-align: center;
`;
