import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import LoanDetails from '../../../../../components/LoanDetails';
import LoanProvider from '../../../../../providers/Loan/Loan.provider';

const LoanDetailsPage: NextPage = () => {
  const router = useRouter();

  const { clientId = '', loanId = '' } = router.query;

  return (
    <LoanProvider clientId={clientId as string} loanId={loanId as string}>
      <LoanDetails />
    </LoanProvider>
  );
};

export default LoanDetailsPage;
