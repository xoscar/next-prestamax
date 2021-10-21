import { Button, Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const PageContainer = styled(Stack)`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const SearchContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
`;

export const AddClientButton = styled(Button).attrs({
  variant: 'contained',
})`
  && {
    margin-left: 14px;
    background: ${({ theme }) => theme.acceptButtonColor};

    &:hover {
      background: ${({ theme }) => theme.acceptButtonColor};
    }
  }
`;

export const CardContainer = styled(Grid).attrs({
  container: true,
  spacing: 2,
  xs: 12,
  lg: 10,
  xl: 8,
})`
  margin-top: 24px;
`;
