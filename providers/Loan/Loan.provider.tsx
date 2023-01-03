import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import LoanGateway from '../../gateways/Loan.gateway';
import Loan, { TPartialLoan } from '../../models/Loan.model';
import queryClient from '../../server/utils/QueryClient';

interface IContext {
  onCreate(values: TPartialLoan): void;
  onUpdate(values: TPartialLoan): void;
  onDelete(): void;
  loan?: Loan;
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
  loanId?: string;
  clientId: string;
}

export const useLoan = () => useContext(Context);

const LoanProvider = ({ children, clientId, loanId }: IProps) => {
  const router = useRouter();
  const { mutate: createMutation } = useMutation({
    mutationFn: LoanGateway.create,
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: LoanGateway.update,
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: LoanGateway.remove,
  });
  const { data: loan, isLoading } = useQuery(['loan', loanId], () =>
    loanId ? LoanGateway.getOne({ clientId, loanId }) : undefined,
  );

  const onCreate = useCallback(
    (values: TPartialLoan) => {
      createMutation(
        { clientId, values },
        {
          onSuccess: (loan) => {
            router.push(`/clients/${loan.clientId}/loans/${loan.id}`);
          },
        },
      );
    },
    [clientId, createMutation, router],
  );

  const onUpdate = useCallback(
    (values: TPartialLoan) => {
      updateMutation(
        { clientId, loanId: loanId!, values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('loan');
          },
        },
      );
    },
    [clientId, loanId, updateMutation],
  );

  const onDelete = useCallback(() => {
    deleteMutation(
      { clientId, loanId: loanId! },
      {
        onSuccess: () => {
          router.push(`/clients/${clientId}`);
        },
      },
    );
  }, [clientId, deleteMutation, loanId, router]);

  const value = useMemo<IContext>(
    () => ({
      loan,
      isLoading,
      onCreate,
      onUpdate,
      onDelete,
    }),
    [loan, isLoading, onCreate, onUpdate, onDelete],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default LoanProvider;
