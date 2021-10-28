import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { Media } from '../../styles/mixins';

const { tabletUp } = Media;

export const ListDataEntry = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Wrapper = styled(Grid).attrs({
  xs: 12,
  md: 3,
})`
  margin-top: 24px;

  ${tabletUp`
    margin-top: 0;
  `}
`;

export const EntryFieldText = styled(Typography).attrs({
  variant: 'body2',
})``;

export const EntryValueText = styled(Typography).attrs({
  variant: 'body2',
})`
  color: ${({ theme }) => theme.subTextColor};
`;

export const DeleteButton = styled(Button).attrs({
  variant: 'contained',
})`
  && {
    align-self: flex-end;
    background: ${({ theme }) => theme.headingColor};

    &:hover {
      background: ${({ theme }) => theme.headingColor};
    }
  }
`;