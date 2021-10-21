import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import SubHeading from '../../components/subHeading';
import {
  AddClientButton,
  CardContainer,
  PageContainer,
  SearchContainer,
} from '../../styles/pages/homeStyled';
import Search from '../../components/search';
import { addClient, loadNextPage, searchClients } from '../../reducers/ClientReducer';
import {
  clientListHasMoreItemsSelector,
  clientListSelector,
  clientsLoadingStateSelector,
} from '../../selectors/clientSelectors';
import ClientCard from '../../components/clientCard';
import InfiniteScroll from '../../components/infiniteScroll';
import { LoadingState } from '../../enums/common';
import NoMoreItems from '../../components/noMoreItems';
import ClientModal from '../../components/clientModal';
import { FormDataClientType } from '../../records/Client';

const HomePage: NextPage = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const clientList = useSelector(clientListSelector);
  const isLoading = useSelector(clientsLoadingStateSelector) !== LoadingState.SUCCESS;
  const hasMoreItems = useSelector(clientListHasMoreItemsSelector);

  useEffect(() => {
    setTimeout(() => {
      dispatch(searchClients({ search: searchText }));
    });
  }, [dispatch, searchText]);

  const onSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const onInfiniteScroll = useCallback(() => {
    dispatch(loadNextPage({ search: searchText }));
  }, [dispatch, searchText]);

  const onAddClient = useCallback(
    async (values: FormDataClientType) => {
      await dispatch(addClient(values));
      setIsModalOpen(false);
    },
    [dispatch],
  );

  return (
    <PageContainer>
      <SubHeading text="Clientes" />
      <SearchContainer>
        <Search value={searchText} onChange={(newValue) => onSearch(newValue)} />
        <AddClientButton onClick={() => setIsModalOpen(true)}>Agregar Cliente</AddClientButton>
        <ClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onAddClient}
        />
      </SearchContainer>
      <CardContainer>
        {clientList.map((client) => (
          <ClientCard client={client} key={client.id} />
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
