import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const CardWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  justify-content: center;
`;

export const DataEntry = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;
  white-space: nowrap;
`;

export const ClientIdText = styled(Typography).attrs({ variant: 'h5' })``;
export const ClientNameText = styled(Typography).attrs({ variant: 'subtitle1' })`
  color: ${({ theme }) => theme.subTextColor};
  text-overflow: ellipsis;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 16px;
`;

export const DataEntryFieldText = styled(Typography).attrs({ variant: 'body2' })``;

export const DangerDataEntryFieldText = styled(DataEntryFieldText)`
  color: ${({ theme }) => theme.headingColor};
`;
