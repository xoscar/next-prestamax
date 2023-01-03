import styled, { DefaultTheme, css, FlattenSimpleInterpolation } from 'styled-components';
import { Typography } from '@mui/material';
import { Media } from '../../styles/mixins';

const { tabletUp } = Media;

type UserLinkProps = {
  isDesktop?: boolean;
};

export const UserLink = styled(Typography).attrs<UserLinkProps>(({ isDesktop = false }) => ({
  variant: isDesktop ? 'body1' : 'body2',
}))<UserLinkProps>`
  cursor: pointer;
  color: ${({ theme }) => theme.headingColor};

  ${tabletUp`
    ${
      css<DefaultTheme>`
        color: ${({ theme }) => theme.whiteColor};
      ` as FlattenSimpleInterpolation
    }
  `}
`;
