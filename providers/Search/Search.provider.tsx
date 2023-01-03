import { noop } from 'lodash';
import { createContext, useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import SearchGateway from '../../gateways/Search.gateway';
import Client from '../../models/Client.model';
import Loan from '../../models/Loan.model';
import { SearchableRepos } from '../../server/types/Search.types';

interface IContext {
  resultList: Loan[] | Client[];
  searchText: string;
  setSearchText(search: string): void;
  setPageNumber(page: number): void;
}

export const Context = createContext<IContext>({
  resultList: [],
  searchText: '',
  setSearchText: noop,
  setPageNumber: noop,
});

interface IProps {
  children: React.ReactNode;
  type: SearchableRepos;
}

export const useSearch = () => useContext(Context);

const pageSize = 20;

const SearchProvider = ({ children, type }: IProps) => {
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const { data: resultList = [] } = useQuery([type, { searchText }], () =>
    SearchGateway.search({ search: searchText, take: pageSize, skip: pageSize * pageNumber, type }),
  );

  const value = useMemo<IContext>(
    () => ({
      resultList,
      setSearchText,
      searchText,
      setPageNumber,
    }),
    [resultList, searchText],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default SearchProvider;
