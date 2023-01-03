import type { NextPage } from 'next';
import SearchProvider from '../providers/Search';
import Home from '../components/Home';
import { SearchableRepos } from '../server/types/Search.types';

const HomePage: NextPage = () => {
  return (
    <SearchProvider type={SearchableRepos.CLIENT}>
      <Home />
    </SearchProvider>
  );
};

export default HomePage;
