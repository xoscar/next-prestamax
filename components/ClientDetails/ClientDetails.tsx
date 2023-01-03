import SubHeading from '../../components/SubHeading';
import { PageContainer } from '../Home/Home.styled';
import ClientForm from '../../components/ClientForm/ClientForm';
import { DetailsContainer, FormContainer, TabsContainer } from './ClientDetails.styled';
import ClientSummary from '../ClientSummary/ClientSummary';
import ClientDetailsTabs from '../ClientDetailsTabs/ClientDetailsTabs';
import { useClient } from '../../providers/Client/Client.provider';
import Loading from '../Loading';

const ClientDetails = () => {
  const { client, isLoading, onUpdate, onDelete } = useClient();

  if (!client || isLoading) return <Loading />;

  const { clientId, name, surname, id } = client;

  return (
    <PageContainer>
      <SubHeading text={`${name} ${surname} (${clientId})`} />
      <DetailsContainer>
        <FormContainer>
          <ClientForm client={client} onSubmit={onUpdate} />
        </FormContainer>
        <ClientSummary client={client} onDelete={() => onDelete(id)} />
        <TabsContainer>
          <ClientDetailsTabs
            client={client}
            showFinished={false}
            onFinishedChange={console.log}
            onLoansNextPage={console.log}
            onChargesNextPage={console.log}
            onAddLoan={console.log}
            onAddCharge={console.log}
          />
        </TabsContainer>
      </DetailsContainer>
    </PageContainer>
  );
};

export default ClientDetails;
