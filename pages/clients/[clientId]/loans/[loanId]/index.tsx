import { useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { noop } from 'lodash';
import SubHeading from '../../../../../components/subHeading';
import { PageContainer } from '../../../../../styles/pages/homeStyled';
import { LoadingState } from '../../../../../enums/common';
import {
  DetailsContainer,
  FormContainer,
  TabsContainer,
} from '../../../../../styles/pages/clientDetailsStyled';
import { deleteLoan, getLoan, updateLoan } from '../../../../../actions/loanActions';
import { FormDataLoanType } from '../../../../../records/Loan';
import { loanLoadingStateSelector, loanSelector } from '../../../../../selectors/loanSelectors';
import LoanForm from '../../../../../components/loanForm';
import LoanDetails from '../../../../../components/loanDetails';
import LoanDetailsTabs from '../../../../../components/loanDetailsTabs';
import { addPayment } from '../../../../../reducers/PaymentReducer';
import { FormDataPaymentType } from '../../../../../records/Payment';

const LoanDetailsPage: NextPage = () => {
  const dispatch = useDispatch();
  const loan = useSelector(loanSelector);
  const isLoading = useSelector(loanLoadingStateSelector) !== LoadingState.SUCCESS;

  const { client, id = '' } = loan || {};
  const { client_id = '', name, surname } = client || {};

  const {
    query: { clientId, loanId },
  } = useRouter();

  useEffect(() => {
    if (clientId && loanId)
      dispatch(getLoan({ clientId: clientId as string, loanId: loanId as string }));
  }, [dispatch, clientId, loanId]);

  const onEdit = useCallback(
    (values: FormDataLoanType) => {
      dispatch(updateLoan({ clientId: client_id, loanId: id, values }));
    },
    [dispatch, client_id, id],
  );

  const onDelete = useCallback(() => {
    dispatch(deleteLoan({ clientId: client_id, loanId: id }));
  }, [dispatch, client_id, id]);

  const onAddPayment = useCallback(
    (values: FormDataPaymentType) => {
      dispatch(addPayment({ clientId: client_id, loanId: id, values }));
    },
    [dispatch, client_id, id],
  );

  return !isLoading && !!loan ? (
    <PageContainer>
      <SubHeading text={`${name} ${surname} (${client_id})`} />
      <DetailsContainer>
        <FormContainer>
          <LoanForm loan={loan} onSubmit={onEdit} onCancel={noop} />
        </FormContainer>
        <LoanDetails loan={loan} onDelete={onDelete} />
        <TabsContainer>
          <LoanDetailsTabs loan={loan} onAddPayment={onAddPayment} />
        </TabsContainer>
      </DetailsContainer>
    </PageContainer>
  ) : null;
};

export default LoanDetailsPage;
