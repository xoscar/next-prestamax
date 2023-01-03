import { Grid } from '@mui/material';
import styled from 'styled-components';

export const DetailsContainer = styled(Grid).attrs({
  container: true,
  xs: 12,
  lg: 10,
  xl: 8,
})`
  margin-top: 24px;
  gap: 16px;
`;

export const FormContainer = styled(Grid).attrs({
  xs: 12,
  md: 8,
})``;

export const TabsContainer = styled(Grid).attrs({
  xs: 12,
})``;
