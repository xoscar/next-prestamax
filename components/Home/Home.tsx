import { useState } from 'react';
import SubHeading from '../../components/SubHeading';
import {
  AddClientButton,
  CardContainer,
  PageContainer,
  SearchContainer,
} from './Home.styled';
import Search from '../../components/Search';
import ClientModal from '../../components/ClientModal';
import { useClient } from '../../providers/Client/Client.provider';
import { useSearch } from '../../providers/Search/Search.provider';
import ClientCard from '../ClientCard';
import Client from '../../models/Client.model';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { onCreate } = useClient();
  const { resultList, setSearchText, searchText } = useSearch();

  return (
    <PageContainer>
      <SubHeading text="Clientes" />
      <SearchContainer>
        <Search value={searchText} onChange={setSearchText} />
        <AddClientButton onClick={() => setIsModalOpen(true)}>Agregar Cliente</AddClientButton>
        <ClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onCreate}
        />
      </SearchContainer>
      <CardContainer>
        {resultList.map((client) => (
          <ClientCard key={client.id} client={client as Client} />
        ))}
      </CardContainer>
    </PageContainer>
  );
};

export default Home;
