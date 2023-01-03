import { Divider, List, ListItem } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { useMemo, useState } from 'react';
import Client from '../../models/Client.model';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import {
  DeleteButton,
  EntryFieldText,
  EntryValueText,
  ListDataEntry,
  Wrapper,
} from './ClientSummary.styled';

export type IProps = {
  client: Client;
  onDelete(): void;
};

const ClientSummary = ({ client, onDelete }: IProps) => {
  const { created, name, surname, clientId } = client;
  const { totalDebt, expiredLoansCount, activeLoans } = useMemo(() => Client.getStats(client), [client]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });
  const expiredLoansText = !!expiredLoansCount ? 'Si' : 'No';
  const totalDebtText = totalDebt ? `$${totalDebt.toFixed(2)}` : 'Sin Adeudo';

  return (
    <Wrapper>
      <List aria-label="client information">
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Adeudo</EntryFieldText>
            <EntryValueText>{totalDebtText}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Creado</EntryFieldText>
            <EntryValueText>{createdAt}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Prest. Activos</EntryFieldText>
            <EntryValueText>{activeLoans}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Prest. Vencidos</EntryFieldText>
            <EntryValueText>{expiredLoansText}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <ListItem>
          <ListDataEntry>
            <DeleteButton onClick={() => setIsModalOpen(true)}>Eliminar Cliente</DeleteButton>
          </ListDataEntry>
        </ListItem>
      </List>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onDelete}
        title="Eliminar Cliente"
        message={`Estas a punto de eliminar al cliente ${name} ${surname} (${clientId}). Deseas Continuar?`}
        confirmText="Eliminar"
      />
    </Wrapper>
  );
};

export default ClientSummary;
