import { Modal } from '@mui/material';
import { FunctionComponent } from 'react';
import Payment, { FormDataPaymentType } from '../../records/Payment';
import PaymentForm from '../paymentForm';
import { ModalContent, ModalTitle } from './paymentModalStyled';

export type PaymentModalProps = {
  isOpen: boolean;
  onClose(): void;
  payment?: Payment;
  onSubmit(values: FormDataPaymentType): void;
};

const PaymentModal: FunctionComponent<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  payment,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="payment-modal"
      aria-describedby="payment-modal"
    >
      <ModalContent>
        <ModalTitle>Agregar Pago</ModalTitle>
        <PaymentForm onSubmit={onSubmit} payment={payment} onCancel={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
