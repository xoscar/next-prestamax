import { IKeyValue } from '../interfaces/ICommon';
import { IRestClient, RestClientParams, ResponseAPI } from '../interfaces/IRestClient';
import TokenMiddleware from './middlewares/TokenMiddleware';
import RestClient, { request } from './RestClient';

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
  baseHeaders: IKeyValue<string> = {},
  pathParameters: IKeyValue<string> = {},
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
