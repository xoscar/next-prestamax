import queryString from 'query-string';
import { HttpMethods, ContentTypes } from '../enums/http';
import { IKeyValue } from '../interfaces/ICommon';
import {
  IRestClient,
  ParseOption,
  RequestParams,
  ResponseAPI,
  RestClientParams,
} from '../interfaces/IRestClient';

const injectPathParameters = (url: string, pathParameters: IKeyValue<string> = {}) =>
  Object.keys(pathParameters).reduce(
    (acc, parameter: string) =>
      acc.replace(new RegExp(`{{${parameter}}}`, 'gm'), pathParameters[parameter]),
    url,
  );

const getHeaders = (customHeaders: IKeyValue<string>): Headers => {
  return new Headers({
    'Content-Type': 'application/json',
    ...customHeaders,
  });
};

const parseOptions = <T>({
  url,
  queryParams = {},
  pathParameters,
  method = HttpMethods.GET,
  headers = {},
  body,
}: RestClientParams<T>) => {
  const options: ParseOption = {
    endpoint: `${injectPathParameters(url, pathParameters)}?${queryString.stringify(queryParams, {
      skipNull: true,
    })}`,
    options: {
      method,
      headers: getHeaders(headers),
    },
  };
  if (typeof body === 'object' && JSON.stringify(body)) {
    options.options.body = JSON.stringify(body);
  }
  return options;
};

const parseJson = async <T>(response: Response, parseResponse: boolean): Promise<T> => {
  const { headers } = response;
  const text = await response.text();
  return parseResponse && headers.get(ContentTypes.contentType) && !!text ? JSON.parse(text) : text;
};

const handleResponse = async <T>(
  response: Response,
  { parseResponse = true },
): Promise<ResponseAPI<T>> => {
  const { status, headers } = response;
  const json = await parseJson<T>(response, parseResponse);

  if (status < 200 || status >= 400) {
    return Promise.reject({ status, json, headers });
  }

  return Promise.resolve({
    status,
    json,
    headers,
  });
};

export const request = async <T, R>(
  requestParams: RestClientParams<T>,
): Promise<ResponseAPI<R>> => {
  const { parseResponse } = requestParams;
  const { endpoint, options } = parseOptions(requestParams);
  const response = await fetch(endpoint, { ...options });
  return handleResponse<R>(response, { parseResponse });
};

const RestClient = <T, R>(
  url: string,
  baseHeaders: IKeyValue<string> = {},
  pathParameters: IKeyValue<string> = {},
): IRestClient<T, R> => {
  const basePath = injectPathParameters(url, pathParameters);
  const singleItemPath = `${basePath}/{{id}}`;

  const restRequest = <X>(
    requestParams: RequestParams<T> = {},
    method: HttpMethods = HttpMethods.GET,
    parseResponse = true,
  ): Promise<ResponseAPI<X>> => {
    const { id, headers = {}, pathParameters = {} } = requestParams;
    const url = id ? singleItemPath : basePath;
    if (id && pathParameters) {
      pathParameters.id = id;
    }

    return request<T, X>({
      ...requestParams,
      url,
      parseResponse,
      method,
      headers: { ...baseHeaders, ...headers },
      pathParameters,
    });
  };

  return {
    get(requestParams = {}, parseResponse = true) {
      return restRequest(requestParams, HttpMethods.GET, parseResponse);
    },
    getOne(requestParams) {
      return restRequest(requestParams);
    },
    post(requestParams) {
      return restRequest(requestParams, HttpMethods.POST);
    },
    put(requestParams) {
      return restRequest(requestParams, HttpMethods.PUT);
    },
    remove(requestParams) {
      return restRequest(requestParams, HttpMethods.DELETE);
    },
  };
};

export default RestClient;
