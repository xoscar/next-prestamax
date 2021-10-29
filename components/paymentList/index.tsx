import { FunctionComponent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loan from '../../records/Loan';
import Payment, { FormDataPaymentType } from '../../records/Payment';
import { deletePayment, updatePayment } from '../../reducers/PaymentReducer';
import { AppDispatch } from '../../tools/configureStore';
import { CardContainer } from '../clientDetailsTabs/clientDetailsTabsStyled';
import ConfirmationModal from '../confirmationModal';
import PaymentCard from '../paymentCard';
import PaymentModal from '../paymentModal';

export type PaymentListProps = {
  paymentList: Array<Payment>;
  loan: Loan;
};

const PaymentList: FunctionComponent<PaymentListProps> = ({ paymentList, loan }) => {
  const {
    client: { client_id: clientId },
    id: loanId,
  } = loan;

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>();
  const dispatch = useDispatch<AppDispatch>();

  const onEdit = useCallback((payment: Payment) => {
    setIsEditModalOpen(true);
    setSelectedPayment(payment);
  }, []);

  const onDelete = useCallback((payment: Payment) => {
    setIsDeleteModalOpen(true);
    setSelectedPayment(payment);
  }, []);

  const onEditSubmit = useCallback(
    (values: FormDataPaymentType) => {
      dispatch(
        updatePayment({
          clientId,
          loanId,
          paymentId: selectedPayment?.id as string,
          values,
        }),
      );
      setIsEditModalOpen(false);
    },
    [dispatch, clientId, loanId, selectedPayment],
  );

  const onDeleteConfirm = useCallback(() => {
    dispatch(
      deletePayment({
        clientId,
        loanId,
        paymentId: selectedPayment?.id as string,
      }),
    );
    setIsDeleteModalOpen(false);
  }, [dispatch, clientId, loanId, selectedPayment?.id]);

  return (
    <>
      <CardContainer>
        {paymentList.map((payment) => (
          <PaymentCard payment={payment} key={payment.id} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </CardContainer>
      <PaymentModal
        payment={selectedPayment}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={onEditSubmit}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDeleteConfirm}
        title="Eliminar Pago"
        message="Al confirmar esta ventana se eliminara el pago del sistema"
        confirmText="Eliminar"
      />
    </>
  );
};

export default PaymentList;
