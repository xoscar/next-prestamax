import { Divider, List, ListItem } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { FunctionComponent, useState } from 'react';
import Client from '../../records/Client';
import ConfirmationModal from '../confirmationModal';
import {
  DeleteButton,
  EntryFieldText,
  EntryValueText,
  ListDataEntry,
  Wrapper,
} from './clientDetailsStyled';

export type ClientDetailsProps = {
  client: Client;
  onDelete(): void;
};

const ClientDetails: FunctionComponent<ClientDetailsProps> = ({ client, onDelete }) => {
  const { stats, created, name, surname, client_id } = client;
  const { total_debt, expired_loans, active_loans } = stats;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });
  const expiredLoans = !!expired_loans ? 'Si' : 'No';
  const totalDebt = total_debt ? `$${total_debt.toFixed(2)}` : 'Sin Adeudo';

  return (
    <Wrapper>
      <List aria-label="client information">
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Adeudo</EntryFieldText>
            <EntryValueText>{totalDebt}</EntryValueText>
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
            <EntryValueText>{active_loans}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Prest. Vencidos</EntryFieldText>
            <EntryValueText>{expiredLoans}</EntryValueText>
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
        message={`Estas a punto de eliminar al cliente ${name} ${surname} (${client_id}). Deseas Continuar?`}
        confirmText="Eliminar"
      />
    </Wrapper>
  );
};

export default ClientDetails;
