import { Box, Typography, Grid } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;

export const Text = styled(Typography).attrs({ varian: 'body2' })`
  color: ${({ theme }) => theme.textColor};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.acceptButtonColor};
`;

export const LoadingContainer = styled(Grid).attrs({
  boxShadow: 3,
  item: true,
  xs: 12,
  md: 6,
  lg: 8,
  xl: 4,
})`
  padding: 24px;
  background ${({ theme }) => theme.whiteColor};
`;
