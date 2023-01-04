import { noop } from 'lodash';
import { createContext, useContext, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import SearchGateway from '../../gateways/Search.gateway';
import Client from '../../models/Client.model';
import Loan from '../../models/Loan.model';
import { SearchableRepos } from '../../server/types/Search.types';

type TResultList = Loan[] | Client[];

interface IContext {
  resultList: TResultList;
  searchText: string;
  hasNextPage: boolean;
  setSearchText(search: string): void;
  fetchNextPage(): void;
}

export const Context = createContext<IContext>({
  resultList: [],
  searchText: '',
  hasNextPage: false,
  setSearchText: noop,
  fetchNextPage: noop,
});

interface IProps {
  children: React.ReactNode;
  type: SearchableRepos;
}

export const useSearch = () => useContext(Context);

const pageSize = 20;

const SearchProvider = ({ children, type }: IProps) => {
  const [searchText, setSearchText] = useState('');
  const {
    data: { pages = [] } = {},
    fetchNextPage,
    hasNextPage = false,
  } = useInfiniteQuery(
    [type, { searchText }],
    ({ pageParam = 0 }) =>
      SearchGateway.search({
        search: searchText,
        take: pageSize,
        skip: pageSize * pageParam,
        type,
      }),
    {
      getPreviousPageParam: () => undefined,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === pageSize ? allPages.length : undefined,
    },
  );

  const resultList = pages.flat() as TResultList;

  const value = useMemo<IContext>(
    () => ({
      resultList,
      setSearchText,
      searchText,
      hasNextPage,
      fetchNextPage,
    }),
    [fetchNextPage, hasNextPage, resultList, searchText],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default SearchProvider;
