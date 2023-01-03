import { FunctionComponent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { getIsPublicPath } from '../utils/router';
import Navigation from '../components/Navigation';
import { GlobalStyles } from '../styles/Global.styled';

export type LayoutProps = {
  children: ReactElement;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const shouldDisplayNav = !getIsPublicPath(router.asPath);

  return (
    <>
      <GlobalStyles />
      {shouldDisplayNav && <Navigation />}
      {children}
    </>
  );
};

export default Layout;
