import { Button, Card, CardActions, CardContent } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { FunctionComponent } from 'react';
import Payment from '../../records/Payment';
import { CardWrapper, ClientIdText, ClientNameText, DataEntry } from './paymentCardStyled';

export type PaymentCardProps = {
  payment: Payment;
  onEdit(charge: Payment): void;
  onDelete(charge: Payment): void;
};

const PaymentCard: FunctionComponent<PaymentCardProps> = ({
  payment: { amount, created },
  payment,
  onDelete,
  onEdit,
}) => {
  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });

  return (
    <CardWrapper>
      <Card sx={{ width: '300px' }}>
        <CardContent>
          <DataEntry>
            <ClientIdText>${amount}</ClientIdText>
          </DataEntry>
          <DataEntry>
            <ClientNameText>{createdAt}</ClientNameText>
          </DataEntry>
        </CardContent>
        <CardActions>
          <Button size="small" color="warning" onClick={() => onEdit(payment)}>
            Editar
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(payment)}>
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </CardWrapper>
  );
};

export default PaymentCard;
