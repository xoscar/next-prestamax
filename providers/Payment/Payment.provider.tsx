import { noop } from 'lodash';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useMutation } from 'react-query';
import PaymentGateway from '../../gateways/Payment.gateway';
import { TPartialCharge } from '../../models/Charge.model';
import { TPartialPayment } from '../../models/Payment.model';
import queryClient from '../../server/utils/QueryClient';

interface IContext {
  onCreate(values: TPartialPayment): void;
  onUpdate(paymentId: string, values: TPartialPayment): void;
  onDelete(paymentId: string): void;
}

export const Context = createContext<IContext>({
  onCreate: noop,
  onUpdate: noop,
  onDelete: noop,
});

interface IProps {
  children: React.ReactNode;
  clientId: string;
  loanId: string;
}

export const usePayment = () => useContext(Context);

const PaymentProvider = ({ children, clientId, loanId }: IProps) => {
  const { mutate: createMutation } = useMutation({
    mutationFn: PaymentGateway.create,
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: PaymentGateway.update,
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: PaymentGateway.remove,
  });

  const onCreate = useCallback(
    (values: TPartialCharge) => {
      createMutation(
        { clientId, loanId, values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('loan');
          },
        },
      );
    },
    [clientId, createMutation, loanId],
  );

  const onUpdate = useCallback(
    (paymentId: string, values: TPartialCharge) => {
      updateMutation(
        { clientId, paymentId, loanId, values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('loan');
          },
        },
      );
    },
    [clientId, loanId, updateMutation],
  );

  const onDelete = useCallback(
    (paymentId: string) => {
      deleteMutation(
        { clientId, paymentId, loanId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('loan');
          },
        },
      );
    },
    [clientId, deleteMutation, loanId],
  );

  const value = useMemo<IContext>(
    () => ({
      onCreate,
      onUpdate,
      onDelete,
    }),
    [onCreate, onDelete, onUpdate],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default PaymentProvider;
