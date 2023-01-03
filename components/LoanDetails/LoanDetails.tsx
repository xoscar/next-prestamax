import type { NextPage } from 'next';
import { useLoan } from '../../providers/Loan/Loan.provider';
import Loading from '../Loading';
import { PageContainer } from '../Home/Home.styled';
import SubHeading from '../SubHeading';
import LoanSummary from '../LoanSummary';
import { DetailsContainer, FormContainer } from '../ClientDetails/ClientDetails.styled';
import LoanForm from '../LoanForm';
import LoanDetailsTabs from '../LoanDetailsTabs';

const LoanDetailsPage: NextPage = () => {
  const { loan, isLoading, onDelete, onUpdate } = useLoan();

  if (!loan || isLoading) return <Loading />;

  const {
    client: { name, surname, clientId },
  } = loan;

  return (
    <PageContainer>
      <SubHeading text={`${name} ${surname} (${clientId})`} />
      <DetailsContainer>
        <FormContainer>
          <LoanForm loan={loan} onSubmit={onUpdate} />
        </FormContainer>
        <LoanSummary loan={loan} onDelete={onDelete} />
        <LoanDetailsTabs loan={loan} />
      </DetailsContainer>
    </PageContainer>
  );
};

export default LoanDetailsPage;
