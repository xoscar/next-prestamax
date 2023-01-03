import { IRestClient, RestClientParams, ResponseAPI } from '../../types/RestClient.types';
import TokenMiddleware from '../middleware/Token.middleware';
import RestClient, { request } from './Rest.client';

type RestType<T, R> =
  | IRestClient<T, R>['get']
  | IRestClient<T, R>['getOne']
  | IRestClient<T, R>['post']
  | IRestClient<T, R>['put']
  | IRestClient<T, R>['remove'];

const attachMiddleware =
  <T, R>(currrentRequest: RestType<T, R>) =>
  (params: RestClientParams<T>) => {
    const composedRequest = TokenMiddleware<T, R>(currrentRequest);

    return composedRequest(params);
  };

export const authedRequest = <T, R>(params: RestClientParams<T>): Promise<ResponseAPI<R>> => {
  const composedRequest = TokenMiddleware<T, R>(request);

  return composedRequest(params);
};

const AuthenticatedClient = <T, R>(
  url: string,
  baseHeaders: Record<string, string> = {},
  pathParameters: Record<string, string> = {},
): IRestClient<T, R> => {
  const restClient = RestClient<T, R>(url, pathParameters, baseHeaders);

  const authClient = Object.keys(restClient).reduce<Partial<IRestClient<T, R>>>(
    (clientInstance, method) => {
      const restClientKey = method as keyof IRestClient<T, R>;
      const restMethod = restClient[restClientKey];

      return {
        ...clientInstance,
        [method]: attachMiddleware<T, R>(restMethod),
      };
    },
    {},
  );

  return authClient as IRestClient<T, R>;
};

export default AuthenticatedClient;
