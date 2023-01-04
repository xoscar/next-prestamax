import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import SubHeading from '../SubHeading';
import { CardContainer, PageContainer, SearchContainer } from '../Home/Home.styled';
import Search from '../Search';
import LoanCard from '../LoanCard';
import { useSearch } from '../../providers/Search/Search.provider';
import Loan from '../../models/Loan.model';

const Loans = () => {
  const { resultList, setSearchText, searchText, fetchNextPage } = useSearch();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <PageContainer>
      <SubHeading text="Prestamos" />
      <SearchContainer>
        <Search value={searchText} onChange={setSearchText} />
      </SearchContainer>
      <CardContainer>
        {resultList.map((loan) => (
          <LoanCard loan={loan as Loan} client={(loan as Loan).client} key={loan.id} />
        ))}
      </CardContainer>
      <div ref={ref} style={{ width: '10px', height: '10px' }} />
    </PageContainer>
  );
};

export default Loans;
