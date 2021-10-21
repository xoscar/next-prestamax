import { Divider, List, ListItem } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { FunctionComponent } from 'react';
import Client from '../../records/Client';
import { EntryFieldText, EntryValueText, ListDataEntry, Wrapper } from './clientDetailsStyled';

export type ClientDetailsProps = {
  client: Client;
};

const ClientDetails: FunctionComponent<ClientDetailsProps> = ({ client }) => {
  const { stats, created } = client;
  const { total_debt, expired_loans, active_loans } = stats;

  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });
  const expiredLoans = !!expired_loans ? 'Si' : 'No';

  return (
    <Wrapper>
      <List aria-label="client information">
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Creado</EntryFieldText>
            <EntryValueText>{createdAt}</EntryValueText>
          </ListDataEntry>
        </ListItem>
        <Divider />
        <ListItem>
          <ListDataEntry>
            <EntryFieldText>Adeudo</EntryFieldText>
            <EntryValueText>{total_debt}</EntryValueText>
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
      </List>
    </Wrapper>
  );
};

export default ClientDetails;
