import { useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SubHeading from '../../../components/subHeading';
import { PageContainer } from '../../../styles/pages/homeStyled';
import { clientsLoadingStateSelector, clientSelector } from '../../../selectors/clientSelectors';
import { LoadingState } from '../../../enums/common';
import { getClient } from '../../../reducers/ClientReducer';
import ClientForm from '../../../components/clientForm';
import {
  DetailsContainer,
  FormContainer,
  TabsContainer,
} from '../../../styles/pages/clientDetailsStyled';
import ClientDetails from '../../../components/clientDetails';
import ClientDetailsTabs from '../../../components/clientDetailsTabs';

const ClientDetailsPage: NextPage = () => {
  const dispatch = useDispatch();
  const client = useSelector(clientSelector);
  const { client_id, name, surname } = client || {};
  const isLoading = useSelector(clientsLoadingStateSelector) !== LoadingState.SUCCESS;
  const {
    query: { clientId },
  } = useRouter();

  useEffect(() => {
    if (clientId) dispatch(getClient(clientId as string));
  }, [dispatch, clientId]);

  const onEdit = useCallback(() => {
    console.log('>>> onEdit');
  }, []);

  const onCancel = useCallback(() => {
    console.log('>>> onCancel');
  }, []);

  return !isLoading && !!client ? (
    <PageContainer>
      <SubHeading text={`${name} ${surname} (${client_id})`} />
      <DetailsContainer>
        <FormContainer>
          <ClientForm client={client} onSubmit={onEdit} onCancel={onCancel} />
        </FormContainer>
        <ClientDetails client={client} />
        <TabsContainer>
          <ClientDetailsTabs />
        </TabsContainer>
      </DetailsContainer>
    </PageContainer>
  ) : null;
};

export default ClientDetailsPage;
