import { Modal } from '@mui/material';
import Payment, { TPartialPayment } from '../../models/Payment.model';
import PaymentForm from '../PaymentForm';
import { ModalContent, ModalTitle } from './PaymentModal.styled';

interface IProps {
  isOpen: boolean;
  onClose(): void;
  payment?: Payment;
  onSubmit(values: TPartialPayment): void;
}

const PaymentModal = ({ isOpen, onClose, onSubmit, payment }: IProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="payment-modal"
      aria-describedby="payment-modal"
    >
      <ModalContent>
        <ModalTitle>Agregar Pago</ModalTitle>
        <PaymentForm
          onSubmit={(values) => {
            onClose();
            onSubmit(values);
          }}
          payment={payment}
          onCancel={onClose}
        />
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
