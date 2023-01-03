import { Button, Card, CardActions, CardContent } from '@mui/material';
import { formatRelative } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import Payment from '../../models/Payment.model';
import { CardWrapper, ClientIdText, ClientNameText, DataEntry } from './PaymentCard.styled';

interface IProps {
  payment: Payment;
  onEdit(charge: Payment): void;
  onDelete(charge: Payment): void;
}

const PaymentCard = ({ payment: { amount, created }, payment, onDelete, onEdit }: IProps) => {
  const createdAt = created && formatRelative(created, new Date(), { locale: esLocale });

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
