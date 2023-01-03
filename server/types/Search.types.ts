import { NextApiRequestQuery } from 'next/dist/server/api-utils';

export enum SearchableRepos {
  LOAN = 'loan',
  CLIENT = 'client',
}

export type TSearchQuery = {
  take: number;
  skip: number;
  search: string;
  type: SearchableRepos;
};

export type TSearchRepository<T> = {
  search(userId: string, query: TSearchQuery, extraQuery?: NextApiRequestQuery): Promise<T[]>;
};
