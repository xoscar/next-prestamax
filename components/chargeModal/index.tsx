import { Modal } from '@mui/material';
import { FunctionComponent } from 'react';
import Charge, { FormDataChargeType } from '../../records/Charge';
import ChargeForm from '../chargeForm';
import { ModalContent, ModalTitle } from './clientModalStyled';

export type ChargeModalProps = {
  isOpen: boolean;
  onClose(): void;
  charge?: Charge;
  onSubmit(values: FormDataChargeType): void;
};

const ChargeModal: FunctionComponent<ChargeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  charge,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="charge-modal"
      aria-describedby="charge-modal"
    >
      <ModalContent>
        <ModalTitle>Agregar Cargo</ModalTitle>
        <ChargeForm onSubmit={onSubmit} charge={charge} onCancel={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default ChargeModal;
