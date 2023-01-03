import type { NextPage } from 'next';
import SearchProvider from '../../providers/Search';
import Loans from '../../components/Loans';
import { SearchableRepos } from '../../server/types/Search.types';

const LoansPage: NextPage = () => {
  return (
    <SearchProvider type={SearchableRepos.LOAN}>
      <Loans />
    </SearchProvider>
  );
};

export default LoansPage;
