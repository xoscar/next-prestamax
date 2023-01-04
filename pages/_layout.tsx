import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { getIsPublicPath } from '../utils/router';
import Navigation from '../components/Navigation';
import { GlobalStyles } from '../styles/Global.styled';

interface IProps {
  children: ReactElement;
}

const Layout = ({ children }: IProps) => {
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
