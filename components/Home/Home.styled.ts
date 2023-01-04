import { Button, Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const PageContainer = styled(Stack)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
`;

export const SearchContainer = styled(Box)`
  display: flex;
  margin-bottom: 24px;
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
  xs: 12,
  lg: 6,
})`
  gap: 12px;
  align-items: start;
`;
