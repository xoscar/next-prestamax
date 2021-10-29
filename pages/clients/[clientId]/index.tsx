import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { noop } from 'lodash';
import SubHeading from '../../../components/subHeading';
import { PageContainer } from '../../../styles/pages/homeStyled';
import { clientsLoadingStateSelector, clientSelector } from '../../../selectors/clientSelectors';
import { LoadingState } from '../../../enums/common';
import { deleteClient, getClient, updateClient } from '../../../reducers/ClientReducer';
import ClientForm from '../../../components/clientForm';
import {
  DetailsContainer,
  FormContainer,
  TabsContainer,
} from '../../../styles/pages/clientDetailsStyled';
import ClientDetails from '../../../components/clientDetails';
import ClientDetailsTabs from '../../../components/clientDetailsTabs';
import { addLoan, loadNextPage, searchLoans } from '../../../actions/loanActions';
import {
  addCharge,
  loadCharges,
  loadNextPage as chargesLoadNextPage,
} from '../../../reducers/ChargeReducer';
import { FormDataClientType } from '../../../records/Client';
import { FormDataLoanType } from '../../../records/Loan';
import { FormDataChargeType } from '../../../records/Charge';

const ClientDetailsPage: NextPage = () => {
  const [showFinished, setShowFinished] = useState<boolean>(false);
  const dispatch = useDispatch();
  const client = useSelector(clientSelector);

  const { client_id, name, surname, id } = client || {};
  const isLoading = useSelector(clientsLoadingStateSelector) !== LoadingState.SUCCESS;
  const {
    query: { clientId },
  } = useRouter();

  useEffect(() => {
    if (clientId) dispatch(getClient(clientId as string));
  }, [dispatch, clientId]);

  useEffect(() => {
    if (id) dispatch(searchLoans({ clientId: id, search: '', finished: showFinished }));

    if (client_id) dispatch(loadCharges({ clientId: client_id as string, paid: showFinished }));
  }, [dispatch, id, client_id, showFinished]);

  const onEdit = useCallback(
    (values: FormDataClientType) => {
      dispatch(updateClient({ clientId: client?.client_id as string, values }));
    },
    [dispatch, client],
  );

  const onDelete = useCallback(() => {
    dispatch(deleteClient(client_id as string));
  }, [dispatch, client_id]);

  const onLoansNextPage = useCallback(() => {
    dispatch(loadNextPage({ search: '', clientId: id, finished: showFinished }));
  }, [dispatch, id, showFinished]);

  const onChargesNextPage = useCallback(() => {
    dispatch(chargesLoadNextPage({ clientId: client_id as string, paid: showFinished }));
  }, [dispatch, client_id, showFinished]);

  const onFinishedChange = useCallback((isChecked) => {
    setShowFinished(isChecked);
  }, []);

  const onAddLoan = useCallback(
    (values: FormDataLoanType) => {
      dispatch(addLoan({ clientId: client_id as string, values }));
    },
    [dispatch, client_id],
  );

  const onAddCharge = useCallback(
    (values: FormDataChargeType) => {
      dispatch(addCharge({ clientId: client_id as string, values }));
    },
    [dispatch, client_id],
  );

  return !isLoading && !!client ? (
    <PageContainer>
      <SubHeading text={`${name} ${surname} (${client_id})`} />
      <DetailsContainer>
        <FormContainer>
          <ClientForm client={client} onSubmit={onEdit} onCancel={noop} />
        </FormContainer>
        <ClientDetails client={client} onDelete={onDelete} />
        <TabsContainer>
          <ClientDetailsTabs
            client={client}
            showFinished={showFinished}
            onFinishedChange={onFinishedChange}
            onLoansNextPage={onLoansNextPage}
            onChargesNextPage={onChargesNextPage}
            onAddLoan={onAddLoan}
            onAddCharge={onAddCharge}
          />
        </TabsContainer>
      </DetailsContainer>
    </PageContainer>
  ) : null;
};

export default ClientDetailsPage;
