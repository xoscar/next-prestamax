import {
  css,
  CSSObject,
  DefaultTheme,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from 'styled-components';
import { em } from 'polished';

const customMediaQuery = (
  minWidth: number,
  maxWidth: number,
  style: TemplateStringsArray | CSSObject,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => {
  return css`
    @media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {
      ${css<DefaultTheme>(style, ...interpolations) as FlattenSimpleInterpolation}
    }
  `;
};

const minMediaQuery = (
  minWidth: number,
  style: TemplateStringsArray | CSSObject,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => {
  return css`
    @media (min-width: ${minWidth}px) {
      ${css<DefaultTheme>(style, ...interpolations) as FlattenSimpleInterpolation}
    }
  `;
};

const maxMediaQuery = (
  minWidth: number,
  style: TemplateStringsArray | CSSObject,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => {
  return css`
    @media (max-width: ${minWidth}px) {
      ${css<DefaultTheme>(style, ...interpolations) as FlattenSimpleInterpolation}
    }
  `;
};

const customScreenMediaQuery = (
  minWidth: number,
  maxWidth: number,
  style: TemplateStringsArray | CSSObject,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => {
  return css`
    @media screen and (min-width: ${em(minWidth)}) and (max-width: ${em(maxWidth)}) {
      ${css<DefaultTheme>(style, ...interpolations) as FlattenSimpleInterpolation}
    }
  `;
};

const minScreenMediaQuery = (width: string) => {
  return (
    style: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation =>
    css`
      @media screen and (min-width: ${width}) {
        ${css<DefaultTheme>(style, ...interpolations) as FlattenSimpleInterpolation}
      }
    `;
};

export const WEB_BREAKPOINTS = {
  DESKTOP_MAX: 1320,
  DESKTOP_MIN: 1060,
  TABLET_MAX: 1059,
  TABLET_MIN: 768,
  MOBILE: 767,
};

interface IMedia {
  custom: typeof customMediaQuery;
  desktopUp: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  desktop: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  desktopDown: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  tabletUp: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  tablet: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  tabletDown: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  mobile: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  minScreenMediaQuery: typeof minScreenMediaQuery;
  landscape: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
  desktopDownOnly: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
}

export const setAllLinkStates = (
  templateStrings: TemplateStringsArray | CSSObject,
  ...args: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  &:hover,
  &:link,
  &:active,
  &:focus,
  &:visited {
    ${css(templateStrings, ...args)}
  }
`;

export const textTruncate = (lineCount: number): FlattenSimpleInterpolation => css`
  display: -webkit-box;
  line-clamp: ${lineCount};
  -webkit-line-clamp: ${lineCount};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const columnGap = ({
  horizontal = '0px',
  vertical = '0px',
}: {
  horizontal?: string;
  vertical?: string;
}): FlattenSimpleInterpolation => css`
  margin: calc(${vertical} / 2) calc(${horizontal} / -2);
  & > * {
    margin: calc(${vertical} / 2) calc(${horizontal} / 2);
  }
`;

export const Media: IMedia = {
  custom: customMediaQuery,
  desktopUp: (styles: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) =>
    minMediaQuery(WEB_BREAKPOINTS.DESKTOP_MIN, styles, ...interpolations),
  desktop: (styles: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) =>
    customMediaQuery(
      WEB_BREAKPOINTS.DESKTOP_MIN,
      WEB_BREAKPOINTS.DESKTOP_MAX,
      styles,
      ...interpolations,
    ),
  desktopDown: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => maxMediaQuery(WEB_BREAKPOINTS.DESKTOP_MIN, styles, ...interpolations),
  tabletUp: (styles: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) =>
    minMediaQuery(WEB_BREAKPOINTS.TABLET_MIN, styles, ...interpolations),
  tablet: (styles: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) =>
    customMediaQuery(
      WEB_BREAKPOINTS.TABLET_MIN,
      WEB_BREAKPOINTS.TABLET_MAX,
      styles,
      ...interpolations,
    ),
  tabletDown: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => maxMediaQuery(WEB_BREAKPOINTS.TABLET_MIN, styles, ...interpolations),
  mobile: (styles: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) =>
    maxMediaQuery(WEB_BREAKPOINTS.MOBILE, styles, ...interpolations),
  minScreenMediaQuery: minScreenMediaQuery,
  landscape: (styles: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) =>
    customScreenMediaQuery(
      WEB_BREAKPOINTS.TABLET_MIN,
      WEB_BREAKPOINTS.TABLET_MAX,
      styles,
      ...interpolations,
    ),
  desktopDownOnly: (
    styles: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) =>
    customScreenMediaQuery(
      WEB_BREAKPOINTS.TABLET_MIN + 1,
      WEB_BREAKPOINTS.DESKTOP_MIN,
      styles,
      ...interpolations,
    ),
};
