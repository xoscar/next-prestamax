import { FunctionComponent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Charge, { FormDataChargeType } from '../../records/Charge';
import Client from '../../records/Client';
import { deleteCharge, payCharge, updateCharge } from '../../reducers/ChargeReducer';
import { AppDispatch } from '../../tools/configureStore';
import ChargeCard from '../chargeCard';
import ChargeModal from '../chargeModal';
import { CardContainer } from '../clientDetailsTabs/clientDetailsTabsStyled';
import ConfirmationModal from '../confirmationModal';
import InfiniteScroll from '../infiniteScroll';
import NoMoreItems from '../noMoreItems';

export type ChargeListProps = {
  chargeList: Array<Charge>;
  hasMoreItems: boolean;
  isLoading: boolean;
  onNextPage(): void;
  client: Client;
};

const ChargeList: FunctionComponent<ChargeListProps> = ({
  chargeList,
  isLoading,
  hasMoreItems,
  onNextPage,
  client,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCharge, setSelectedCharge] = useState<Charge | undefined>();
  const dispatch = useDispatch<AppDispatch>();

  const onEdit = useCallback((charge: Charge) => {
    setIsEditModalOpen(true);
    setSelectedCharge(charge);
  }, []);

  const onDelete = useCallback((charge: Charge) => {
    setIsDeleteModalOpen(true);
    setSelectedCharge(charge);
  }, []);

  const onPay = useCallback((charge: Charge) => {
    setSelectedCharge(charge);
    setIsPayModalOpen(true);
  }, []);

  const onEditSubmit = useCallback(
    (values: FormDataChargeType) => {
      dispatch(
        updateCharge({
          clientId: client.client_id,
          chargeId: selectedCharge?.id as string,
          values,
        }),
      );
      setIsEditModalOpen(false);
    },
    [dispatch, client, selectedCharge],
  );

  const onPayConfirm = useCallback(() => {
    dispatch(
      payCharge({
        clientId: client.client_id,
        chargeId: selectedCharge?.id as string,
      }),
    );
    setIsPayModalOpen(false);
  }, [dispatch, client, selectedCharge]);

  const onDeleteConfirm = useCallback(() => {
    dispatch(
      deleteCharge({
        clientId: client.client_id,
        chargeId: selectedCharge?.id as string,
      }),
    );
    setIsDeleteModalOpen(false);
  }, [dispatch, client, selectedCharge]);

  return (
    <>
      <CardContainer>
        {chargeList.map((charge) => (
          <ChargeCard
            charge={charge}
            key={charge.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onPay={onPay}
          />
        ))}
        <InfiniteScroll
          isLoading={isLoading}
          callback={onNextPage}
          hasMoreItems={hasMoreItems}
          noMoreItemsComponent={<NoMoreItems />}
        />
      </CardContainer>
      <ChargeModal
        charge={selectedCharge}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={onEditSubmit}
      />
      <ConfirmationModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        onConfirm={onPayConfirm}
        title="Confirmacion de Pago"
        message="Al confirmar esta ventana se marcara el cargo como pagado"
        confirmText="Pagar"
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDeleteConfirm}
        title="Eliminar Cargo"
        message="Al confirmar esta ventana se eliminara el cargo del sistema"
        confirmText="Eliminar"
      />
    </>
  );
};

export default ChargeList;
