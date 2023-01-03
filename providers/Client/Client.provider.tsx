import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import ClientGateway from '../../gateways/Client.gateway';
import Client, { TPartialClient } from '../../models/Client.model';
import queryClient from '../../server/utils/QueryClient';

interface IContext {
  onCreate(values: TPartialClient): void;
  onUpdate(values: TPartialClient): void;
  onDelete(clientId: string): void;
  client?: Client;
  isLoading: boolean;
}

export const Context = createContext<IContext>({
  onCreate: noop,
  onUpdate: noop,
  onDelete: noop,
  isLoading: false,
});

interface IProps {
  children: React.ReactNode;
  clientId?: string;
}

export const useClient = () => useContext(Context);

const ClientProvider = ({ children, clientId }: IProps) => {
  const router = useRouter();
  const { mutate: createMutation } = useMutation({
    mutationFn: ClientGateway.create,
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: ClientGateway.update,
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: ClientGateway.remove,
  });

  const { data: client, isLoading } = useQuery(['client', clientId], () =>
    clientId ? ClientGateway.getOne(clientId) : undefined,
  );

  const onCreate = useCallback(
    (draft: TPartialClient) => {
      createMutation(draft, {
        onSuccess: (client) => {
          router.push(`/clients/${client.id}`);
        },
      });
    },
    [createMutation, router],
  );

  const onUpdate = useCallback(
    (values: TPartialClient) => {
      updateMutation(
        { values, clientId: clientId! },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['client']);
          },
        },
      );
    },
    [clientId, updateMutation],
  );

  const onDelete = useCallback(
    (clientId: string) => {
      deleteMutation(clientId, {
        onSuccess: () => {
          router.push(`/`);
        },
      });
    },
    [deleteMutation, router],
  );

  const value = useMemo<IContext>(
    () => ({
      client,
      isLoading,
      onCreate,
      onUpdate,
      onDelete,
    }),
    [client, isLoading, onCreate, onDelete, onUpdate],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ClientProvider;
