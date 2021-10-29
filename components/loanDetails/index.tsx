import { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { Divider, List, ListItem } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import Loan from '../../records/Loan';
import ConfirmationModal from '../confirmationModal';
import {
  DeleteButton,
  EntryFieldText,
  EntryValueText,
  ListDataEntry,
  ViewClientButton,
  Wrapper,
} from './loanDetailsStyled';

export type LoanDetailsProps = {
  loan: Loan;
  onDelete(): void;
};

const LoanDetails: FunctionComponent<LoanDetailsProps> = ({ loan, onDelete }) => {
  const {
    number_id,
    current_balance,
    current_week,
    last_payment,
    paymentList,
    expired,
    expired_date,
    client: { client_id, name, surname },
  } = loan;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const lastPaymentAt =
    isValid(last_payment) && formatRelative(last_payment, new Date(), { locale: esLocale });
  const expiredAt =
    isValid(expired_date) && formatRelative(expired_date, new Date(), { locale: esLocale });
  const isExpired = expired ? 'Si' : 'No';
  const totalDebt = current_balance ? `$${current_balance.toFixed(2)}` : 'Sin Adeudo';

  return (
    <Wrapper>
      <List aria-label="loan information">
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Identificador</EntryFieldText>
            <EntryValueText>{number_id}</EntryValueText>
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
            <EntryValueText>{current_week}</EntryValueText>
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
            <EntryValueText>{paymentList.length}</EntryValueText>
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
            <Link href={`/clients/${client_id}`} passHref>
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
        message={`Estas a punto de eliminar el prestamo con identificador ${number_id} del cliente ${name} ${surname} (${client_id}). Deseas Continuar?`}
        confirmText="Eliminar"
      />
    </Wrapper>
  );
};

export default LoanDetails;
