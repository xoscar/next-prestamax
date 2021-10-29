import { Button, Grid, Switch, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const CardContainer = styled(Grid).attrs({
  container: true,
  spacing: 2,
  xs: 12,
})`
  padding: 24px;
`;

export const TabsContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const FinishedSwitch = styled(Switch)`
  justify-self: flex-end;
`;

export const FinishedText = styled(Typography).attrs({
  variant: 'body2',
})`
  display: inline-block;
`;

export const ActionsContainer = styled(Grid).attrs({
  container: true,
  spacing: 2,
  xs: 12,
})`
  padding: 24px;
`;

export const AddButton = styled(Button).attrs({
  variant: 'contained',
})`
  && {
    background: ${({ theme }) => theme.acceptButtonColor};

    &:hover {
      background: ${({ theme }) => theme.acceptButtonColor};
    }
  }
`;

export const FinishedSwitchContainer = styled(Box)`
  display: flex;
  align-items: center;
`;
