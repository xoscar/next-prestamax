import { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { Divider, List, ListItem } from '@mui/material';
import { formatRelative } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import {
  DeleteButton,
  EntryFieldText,
  EntryValueText,
  ListDataEntry,
  ViewClientButton,
  Wrapper,
} from './LoanDetails.styled';
import Loan from '../../models/Loan.model';

export type LoanDetailsProps = {
  loan: Loan;
  onDelete(): void;
};

const LoanSummary: FunctionComponent<LoanDetailsProps> = ({
  loan: {
    numberId,
    lastPayment,
    payments,
    expiredDate,
    client: { id, clientId, name, surname },
  },
  loan,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const lastPaymentAt =
    lastPayment && formatRelative(lastPayment, new Date(), { locale: esLocale });
  const currentBalance = loan.getCurrentBalance();
  const currentWeek = loan.getCurrentWeek();
  const expiredAt = expiredDate && formatRelative(expiredDate, new Date(), { locale: esLocale });
  const isExpired = loan.isExpired ? 'Si' : 'No';
  const totalDebt = currentBalance ? `$${currentBalance.toFixed(2)}` : 'Sin Adeudo';

  return (
    <Wrapper>
      <List aria-label="loan information">
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Identificador</EntryFieldText>
            <EntryValueText>#{numberId}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Adeudo</EntryFieldText>
            <EntryValueText>{totalDebt}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Semana Actual</EntryFieldText>
            <EntryValueText>{currentWeek}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Ult. Pago</EntryFieldText>
            <EntryValueText>{lastPaymentAt}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText># Pagos</EntryFieldText>
            <EntryValueText>{payments.length}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Vencimiento</EntryFieldText>
            <EntryValueText>{expiredAt}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Vencido</EntryFieldText>
            <EntryValueText>{isExpired}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <ListItem>
          <ListDataEntry>
            <Link href={`/clients/${id}`} passHref>
              <ViewClientButton>Ver Cliente</ViewClientButton>
            </Link>
          </ListDataEntry>
        </ListItem>
        <ListItem>
          <ListDataEntry>
            <DeleteButton onClick={() => setIsModalOpen(true)}>Eliminar Prestamo</DeleteButton>
          </ListDataEntry>
        </ListItem>
      </List>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onDelete}
        title="Eliminar Prestamo"
        message={`Estas a punto de eliminar el prestamo con identificador ${numberId} del cliente ${name} ${surname} (${clientId}). Deseas Continuar?`}
        confirmText="Eliminar"
      />
    </Wrapper>
  );
};

export default LoanSummary;
