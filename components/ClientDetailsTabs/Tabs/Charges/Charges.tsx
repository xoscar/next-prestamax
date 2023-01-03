import { useCallback, useMemo, useState } from 'react';
import Charge, { TPartialCharge } from '../../../../models/Charge.model';
import Client from '../../../../models/Client.model';
import { useCharge } from '../../../../providers/Charge/Charge.provider';
import ChargeCard from '../../../ChargeCard';
import ChargeModal from '../../../ChargeModal/ChargeModal';
import ConfirmationModal from '../../../ConfirmationModal';
import {
  ActionsContainer,
  AddButton,
  CardContainer,
  FinishedSwitch,
  FinishedSwitchContainer,
  FinishedText,
} from '../../ClientDetailsTabs.styled';

interface IProps {
  client: Client;
}

const Charges = ({ client: { charges } }: IProps) => {
  const [isChargeModalOpen, setIsChargeModalOpen] = useState<boolean>(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCharge, setSelectedCharge] = useState<Charge | undefined>();
  const [showFinished, setShowFinished] = useState(false);

  const { onCreate, onUpdate, onPay, onDelete } = useCharge();

  const list = useMemo(
    () => (showFinished ? charges : charges.filter((charges) => !charges.paid)),
    [charges, showFinished],
  );

  const handleOnSubmit = useCallback(
    (values: TPartialCharge) => {
      if (selectedCharge) onUpdate(selectedCharge.id, values);
      else onCreate(values);
    },
    [onCreate, onUpdate, selectedCharge],
  );

  const handleOnPay = useCallback(() => {
    if (selectedCharge) onPay(selectedCharge.id);
  }, [onPay, selectedCharge]);

  const handleOnDelete = useCallback(() => {
    if (selectedCharge) onDelete(selectedCharge.id);
  }, [onDelete, selectedCharge]);

  return (
    <>
      <ActionsContainer>
        <FinishedSwitchContainer>
          <FinishedSwitch
            checked={showFinished}
            onChange={(_, isChecked) => setShowFinished(isChecked)}
          />
          <FinishedText>Mostrar Liquidados</FinishedText>
        </FinishedSwitchContainer>
        <AddButton
          onClick={() => {
            setIsChargeModalOpen(true);
            setSelectedCharge(undefined);
          }}
        >
          Agregar Cargo
        </AddButton>
      </ActionsContainer>
      <CardContainer>
        {list.map((charge) => (
          <ChargeCard
            charge={charge}
            key={charge.id}
            onEdit={() => {
              setSelectedCharge(charge);
              setIsChargeModalOpen(true);
            }}
            onDelete={() => {
              setSelectedCharge(charge);
              setIsDeleteModalOpen(true);
            }}
            onPay={() => {
              setSelectedCharge(charge);
              setIsPayModalOpen(true);
            }}
          />
        ))}
      </CardContainer>
      <ChargeModal
        charge={selectedCharge}
        isOpen={isChargeModalOpen}
        onClose={() => setIsChargeModalOpen(false)}
        onSubmit={handleOnSubmit}
      />
      <ConfirmationModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        onConfirm={handleOnPay}
        title="Confirmacion de Pago"
        message="Al confirmar esta ventana se marcara el cargo como pagado"
        confirmText="Pagar"
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleOnDelete}
        title="Eliminar Cargo"
        message="Al confirmar esta ventana se eliminara el cargo del sistema"
        confirmText="Eliminar"
      />
    </>
  );
};

export default Charges;
