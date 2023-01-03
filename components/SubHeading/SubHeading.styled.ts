import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { Media } from '../../styles/mixins';
import { Box } from '@mui/system';

const { tabletUp } = Media;

export const Wrapper = styled(Box)`
  margin-bottom: 10px;

  ${tabletUp`
    margin-bottom: 24px;
  `}
`;

export const Container = styled(Grid).attrs({
  xs: 12,
})``;

export const Text = styled(Typography).attrs({ variant: 'h4' })`
  color: ${({ theme }) => theme.acceptButtonColor};
`;
