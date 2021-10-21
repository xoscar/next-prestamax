import { Button, Card, CardActions, CardContent } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { FunctionComponent } from 'react';
import Client from '../../records/Client';
import {
  CardWrapper,
  ClientIdText,
  ClientNameText,
  DataEntry,
  DataEntryFieldText,
  DataEntryFieldValue,
} from './clientCardStyled';

export type ClientCardProps = {
  client: Client;
};

const ClientCard: FunctionComponent<ClientCardProps> = ({
  client: { name, surname, client_id, stats },
}) => {
  const { active_charges, active_loans, total_debt, expired_loans, last_payment } = stats;

  const lastPaymentDate =
    last_payment && isValid(last_payment)
      ? formatRelative(last_payment, new Date(), { locale: esLocale })
      : 'No registrado';

  const expiredLoans = !!expired_loans ? 'Si' : 'No';

  return (
    <CardWrapper>
      <Card sx={{ width: '300px' }}>
        <CardContent>
          <DataEntry>
            <ClientIdText>{client_id}</ClientIdText>
          </DataEntry>
          <DataEntry>
            <ClientNameText>
              {name} {surname}
            </ClientNameText>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Adeudo</DataEntryFieldText>{' '}
            <DataEntryFieldValue>${total_debt.toFixed(2)}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Prestamos</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{active_loans}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Ult. Abono</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{lastPaymentDate}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Pres. Vencidos</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{expiredLoans}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Cargos</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{active_charges}</DataEntryFieldValue>
          </DataEntry>
        </CardContent>
        <CardActions>
          <Button size="small">Ver Más</Button>
        </CardActions>
      </Card>
    </CardWrapper>
  );
};

export default ClientCard;
