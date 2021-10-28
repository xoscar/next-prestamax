import { Button, Card, CardActions, CardContent } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { FunctionComponent } from 'react';
import Charge from '../../records/Charge';
import {
  CardWrapper,
  ClientIdText,
  ClientNameText,
  DataEntry,
  DataEntryFieldText,
  DataEntryFieldValue,
} from './chargeCardStyled';

export type ChargeCardProps = {
  charge: Charge;
  onPay(charge: Charge): void;
  onEdit(charge: Charge): void;
  onDelete(charge: Charge): void;
};

const ChargeCard: FunctionComponent<ChargeCardProps> = ({
  charge: { amount, created, paid_date, paid, description, expiration_date },
  charge,
  onPay,
  onDelete,
  onEdit,
}) => {
  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });
  const expirationAt =
    isValid(expiration_date) && formatRelative(expiration_date, new Date(), { locale: esLocale });
  const paidAt = isValid(paid_date) && formatRelative(paid_date, new Date(), { locale: esLocale });
  const isPaid = paid ? 'Si' : 'No';

  return (
    <CardWrapper>
      <Card sx={{ width: '300px' }}>
        <CardContent>
          <DataEntry>
            <ClientIdText>${amount}</ClientIdText>
          </DataEntry>
          <DataEntry>
            <ClientNameText>{description}</ClientNameText>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Creado</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{createdAt}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Expira</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{expirationAt}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Pagado</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{isPaid}</DataEntryFieldValue>
          </DataEntry>
          {!!paid && (
            <DataEntry>
              <DataEntryFieldText>Pagado en</DataEntryFieldText>{' '}
              <DataEntryFieldValue>{paidAt}</DataEntryFieldValue>
            </DataEntry>
          )}
        </CardContent>
        <CardActions>
          {!paid && (
            <Button size="small" color="success" onClick={() => onPay(charge)}>
              Pagar
            </Button>
          )}
          <Button size="small" color="warning" onClick={() => onEdit(charge)}>
            Editar
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(charge)}>
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </CardWrapper>
  );
};

export default ChargeCard;
