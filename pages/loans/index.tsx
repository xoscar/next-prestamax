import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import SubHeading from '../../components/subHeading';
import { CardContainer, PageContainer, SearchContainer } from '../../styles/pages/homeStyled';
import Search from '../../components/search';
import InfiniteScroll from '../../components/infiniteScroll';
import { LoadingState } from '../../enums/common';
import NoMoreItems from '../../components/noMoreItems';
import {
  loanListHasMoreItemsSelector,
  loanListSelector,
  loanLoadingStateSelector,
} from '../../selectors/loanSelectors';
import LoanCard from '../../components/loanCard';
import { loadNextPage, searchLoans } from '../../actions/loanActions';

const HomePage: NextPage = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const loanList = useSelector(loanListSelector);
  const isLoading = useSelector(loanLoadingStateSelector) !== LoadingState.SUCCESS;
  const hasMoreItems = useSelector(loanListHasMoreItemsSelector);

  useEffect(() => {
    setTimeout(() => {
      dispatch(searchLoans({ search: searchText, finished: false }));
    });
  }, [dispatch, searchText]);

  const onSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const onInfiniteScroll = useCallback(() => {
    dispatch(loadNextPage({ search: searchText, finished: false }));
  }, [dispatch, searchText]);

  return (
    <PageContainer>
      <SubHeading text="Prestamos" />
      <SearchContainer>
        <Search value={searchText} onChange={(newValue) => onSearch(newValue)} />
      </SearchContainer>
      <CardContainer>
        {loanList.map((loan) => (
          <LoanCard loan={loan} key={loan.id} />
        ))}
        <InfiniteScroll
          isLoading={isLoading}
          callback={onInfiniteScroll}
          hasMoreItems={hasMoreItems}
          noMoreItemsComponent={<NoMoreItems />}
        />
      </CardContainer>
    </PageContainer>
  );
};

export default HomePage;
