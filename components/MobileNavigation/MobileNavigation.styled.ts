import { Drawer, Typography, List, ListItem } from '@mui/material';
import link from 'next/link';
import styled from 'styled-components';

export const MobileDrawer = styled(Drawer)``;

export const OptionsContainer = styled(List)`
  padding-top: 0;
`;

export const OptionLink = styled(link).attrs({ as: 'a' })`
  color: ${({ theme }) => theme.headingColor};
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:visited,
  &:focus {
    color: ${({ theme }) => theme.headingColor};
  }
`;

export const OptionText = styled(Typography).attrs({
  variant: 'body2',
})``;

export const NavHeading = styled(Typography).attrs({
  variant: 'h5',
})`
  color: ${({ theme }) => theme.whiteColor};
`;

export const NavHeadingItem = styled(ListItem)`
  background ${({ theme }) => theme.headingColor};
  margin-bottom: 14px;
`;
