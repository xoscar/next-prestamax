import { ResponseAPI, RestClientParams } from '../../types/RestClient.types';
import SessionClient from '../Session.gateway';

interface INext<T, R> {
  (options: RestClientParams<T>): Promise<ResponseAPI<R>>;
}

const tokenMiddleware =
  <T, R>(next: INext<T, R>) =>
  (options: RestClientParams<T>): Promise<ResponseAPI<R>> => {
    const session = SessionClient.getSession();
    if (!session) return Promise.reject('No session found');

    const { jwt } = session;

    return next({
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${jwt}` },
    });
  };

export default tokenMiddleware;
