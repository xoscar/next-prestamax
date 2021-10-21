import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { Media } from '../../styles/mixins';

const { tabletUp } = Media;

export const Wrapper = styled(Grid).attrs({
  container: true,
  spacing: 2,
  xs: 12,
  lg: 10,
  xl: 8,
})`
  margin: 10px 0;

  ${tabletUp`
    margin: 40px 0;
  `}
`;

export const Container = styled(Grid).attrs({
  xs: 12,
})``;

export const Text = styled(Typography).attrs({ variant: 'h4' })`
  color: ${({ theme }) => theme.acceptButtonColor};
`;
