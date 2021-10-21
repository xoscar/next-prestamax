import { FunctionComponent, ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../tools/configureStore';
import { authCheck } from '../reducers/UserReducer';
import { userLoadingStateSelector } from '../selectors/userSelectors';
import { LoadingState } from '../enums/common';
import Loading from '../components/loading';
import { useRouter } from 'next/router';
import { getIsPublicPath } from '../utils/router';
import Navigation from '../components/navigation';

export type LayoutProps = {
  children: ReactElement;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userLoadingState = useSelector(userLoadingStateSelector);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);
  const isLoaded = useMemo(() => userLoadingState === LoadingState.SUCCESS, [userLoadingState]);
  const shouldDisplayNav = !getIsPublicPath(router.asPath);

  return isLoaded ? (
    <>
      {shouldDisplayNav && <Navigation />}
      {children}
    </>
  ) : (
    <Loading />
  );
};

export default Layout;
