import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import Loading from '../../components/Loading/Loading';
import { TLoginValues } from '../../components/LoginForm/hooks/useLoginForm';
import LoginGateway from '../../gateways/Login.gateway';
import SessionGateway from '../../gateways/Session.gateway';
import User from '../../models/User.model';

interface IContext {
  onLogin(values: TLoginValues): void;
  onLogout(): void;
  user: User;
}

export const Context = createContext<IContext>({
  onLogin: noop,
  onLogout: noop,
  user: User(),
});

interface IProps {
  children: React.ReactNode;
}

export const useUser = () => useContext(Context);

const UserProvider = ({ children }: IProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const { mutate } = useMutation({
    mutationFn: LoginGateway.login,
  });

  useEffect(() => {
    const user = SessionGateway.getSession();
    setUser(user);

    if (!user && router.pathname !== '/login') router.push('/login');
    else if (!!user && router.pathname === '/login') router.push('/');
  }, [router]);

  const onLogin = useCallback(
    (values: TLoginValues) => {
      mutate(values, {
        onSuccess: (user) => {
          SessionGateway.saveSession(user);
          router.push('/');
        },
      });
    },
    [router, mutate],
  );

  const onLogout = useCallback(() => {
    SessionGateway.removeSession();
    router.push('/login');
  }, [router, mutate]);

  const value = useMemo<IContext>(
    () => ({
      onLogin,
      onLogout,
      user: user!,
    }),
    [user, onLogin, onLogout],
  );

  return !!user || router.pathname === '/login' ? (
    <Context.Provider value={value}>{children}</Context.Provider>
  ) : (
    <Loading />
  );
};

export default UserProvider;
