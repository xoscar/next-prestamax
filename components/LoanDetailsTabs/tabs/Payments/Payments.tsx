import { useCallback, useState } from 'react';
import Loan from '../../../../models/Loan.model';
import Payment, { TPartialPayment } from '../../../../models/Payment.model';
import { usePayment } from '../../../../providers/Payment/Payment.provider';
import { CardContainer } from '../../../ClientDetailsTabs/ClientDetailsTabs.styled';
import ConfirmationModal from '../../../ConfirmationModal/ConfirmationModal';
import PaymentCard from '../../../PaymentCard/PaymentCard';
import PaymentModal from '../../../PaymentModal/PaymentModal';
import { ActionsContainer, AddButton } from '../../LoanDetailsTabs.styled';

interface IProps {
  loan: Loan;
}

const Payments = ({ loan: { payments, finished } }: IProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>();

  const { onCreate, onDelete, onUpdate } = usePayment();

  const handleOnSubmit = useCallback(
    (values: TPartialPayment) => {
      if (selectedPayment) onUpdate(selectedPayment.id, values);
      else onCreate(values);
    },
    [onCreate, onUpdate, selectedPayment],
  );

  const handleOnDelete = useCallback(() => {
    if (selectedPayment) onDelete(selectedPayment.id);
  }, [onDelete, selectedPayment]);

  return (
    <>
      {!finished && (
        <ActionsContainer>
          <AddButton
            onClick={() => {
              setIsEditModalOpen(true);
              setSelectedPayment(undefined);
            }}
          >
            Agregar Pago
          </AddButton>
        </ActionsContainer>
      )}
      <CardContainer>
        {payments.reverse().map((payment) => (
          <PaymentCard
            payment={payment}
            key={payment.id}
            onEdit={(payment) => {
              setSelectedPayment(payment);
              setIsEditModalOpen(true);
            }}
            onDelete={(payment) => {
              setSelectedPayment(payment);
              setIsDeleteModalOpen(true);
            }}
          />
        ))}
      </CardContainer>
      <PaymentModal
        payment={selectedPayment}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleOnSubmit}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleOnDelete}
        title="Eliminar Pago"
        message="Al confirmar esta ventana se eliminara el pago del sistema"
        confirmText="Eliminar"
      />
    </>
  );
};

export default Payments;
