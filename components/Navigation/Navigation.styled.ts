import { Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { Media } from '../../styles/mixins';
import MenuIcon from '@mui/icons-material/Menu';

const { tabletUp } = Media;

export const NavToolBar = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.headingColor};

  ${tabletUp`
    justify-content: space-between;
  `}
`;

export const OptionList = styled(Box)`
  display: none;
  justify-content: space-around;

  ${tabletUp`
    display: inline-flex;
    flex-wrap: wrap;
    gap: 14px;
  `}
`;

export const OptionItem = styled(Box)``;

export const OptionLink = styled(Link).attrs({ as: 'a' })`
  color: ${({ theme }) => theme.whiteColor};
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:visited,
  &:focus {
    color: ${({ theme }) => theme.whiteColor};
  }
`;

export const OptionText = styled(Typography).attrs({ variant: 'body1' })`
  color: ${({ theme }) => theme.whiteColor};
`;

export const AppTitle = styled(Typography).attrs({
  variant: 'h4',
})`
  margin-left: 24px;
  color: ${({ theme }) => theme.whiteColor};

  ${tabletUp`
    margin-left: 0;
  `}
`;

export const MenuLink = styled(MenuIcon)`
  ${tabletUp`
    display: none;
  `}
`;
