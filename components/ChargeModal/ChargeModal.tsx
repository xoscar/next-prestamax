import { Modal } from '@mui/material';
import Charge, { TPartialCharge } from '../../models/Charge.model';
import ChargeForm from '../ChargeForm';
import { ModalContent, ModalTitle } from './ClientModal.styled';

interface IProps {
  isOpen: boolean;
  onClose(): void;
  charge?: Charge;
  onSubmit(values: TPartialCharge): void;
}

const ChargeModal = ({ isOpen, onClose, onSubmit, charge }: IProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="charge-modal"
      aria-describedby="charge-modal"
    >
      <ModalContent>
        <ModalTitle>Agregar Cargo</ModalTitle>
        <ChargeForm
          onSubmit={(values) => {
            onClose();
            onSubmit(values);
          }}
          charge={charge}
          onCancel={onClose}
        />
      </ModalContent>
    </Modal>
  );
};

export default ChargeModal;
