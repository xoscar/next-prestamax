import { noop } from 'lodash';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useMutation } from 'react-query';
import ChargeGateway from '../../gateways/Charge.gateway';
import { TPartialCharge } from '../../models/Charge.model';
import queryClient from '../../server/utils/QueryClient';

interface IContext {
  onCreate(values: TPartialCharge): void;
  onUpdate(chargeId: string, values: TPartialCharge): void;
  onPay(chargeId: string): void;
  onDelete(chargeId: string): void;
}

export const Context = createContext<IContext>({
  onCreate: noop,
  onUpdate: noop,
  onPay: noop,
  onDelete: noop,
});

interface IProps {
  children: React.ReactNode;
  clientId: string;
}

export const useCharge = () => useContext(Context);

const ChargeProvider = ({ children, clientId }: IProps) => {
  const { mutate: createMutation } = useMutation({
    mutationFn: ChargeGateway.create,
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: ChargeGateway.update,
  });
  const { mutate: payMutation } = useMutation({
    mutationFn: ChargeGateway.pay,
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: ChargeGateway.remove,
  });

  const onCreate = useCallback(
    (values: TPartialCharge) => {
      createMutation(
        { clientId, values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('client');
          },
        },
      );
    },
    [clientId, createMutation],
  );

  const onUpdate = useCallback(
    (chargeId: string, values: TPartialCharge) => {
      updateMutation(
        { clientId, chargeId, values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('client');
          },
        },
      );
    },
    [clientId, updateMutation],
  );

  const onPay = useCallback(
    (chargeId: string) => {
      payMutation(
        { clientId, chargeId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('client');
          },
        },
      );
    },
    [clientId, payMutation],
  );

  const onDelete = useCallback(
    (chargeId: string) => {
      deleteMutation(
        { clientId, chargeId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('client');
          },
        },
      );
    },
    [clientId, deleteMutation],
  );

  const value = useMemo<IContext>(
    () => ({
      onCreate,
      onUpdate,
      onPay,
      onDelete,
    }),
    [onCreate, onDelete, onPay, onUpdate],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ChargeProvider;
