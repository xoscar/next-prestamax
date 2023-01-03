import { HttpMethods } from '../constants/Http.constants';

export interface ParseOption {
  endpoint: string;
  options: RequestInit;
}

export interface ResponseAPI<T> {
  status: number;
  json: T;
  headers: Headers;
}

export interface RequestParams<T> {
  id?: string;
  body?: T;
  queryParams?: Record<string, string | number | boolean | undefined>;
  pathParameters?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface RestClientParams<T> {
  url: string;
  method: HttpMethods;
  parseResponse?: boolean;
  id?: string;
  body?: T;
  queryParams?: Record<string, string | number | boolean | undefined>;
  pathParameters?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface IRestClient<T, R> {
  get<X = R>(requestParams?: RequestParams<T>, parseResponse?: boolean): Promise<ResponseAPI<X>>;
  getOne<X = R>(requestParams?: RequestParams<T>): Promise<ResponseAPI<X>>;
  post<X = R>(requestParams?: RequestParams<T>): Promise<ResponseAPI<X>>;
  put<X = R>(requestParams?: RequestParams<T>): Promise<ResponseAPI<X>>;
  remove<X = R>(requestParams?: RequestParams<T>): Promise<ResponseAPI<X>>;
}
