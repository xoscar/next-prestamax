import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.acceptButtonColor};
`;

export const Container = styled(Grid).attrs({
  boxShadow: 3,
  item: true,
  xs: 12,
  md: 6,
  lg: 8,
  xl: 4,
  sx: {
    display: 'grid',
  },
})`
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.headingColor};
`;

export const FormContainer = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 14px;
  background: ${({ theme }) => theme.whiteColor};
`;

export const Title = styled(Typography).attrs({
  variant: 'h3',
})`
  && {
    margin: 5px;
    color: ${({ theme }) => theme.whiteColor};
  }
`;
