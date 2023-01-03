import { Button, Card, CardActions, CardContent } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import Charge from '../../models/Charge.model';
import {
  CardWrapper,
  ClientIdText,
  DataEntry,
  DataEntryFieldText,
  SuccessDataEntryFieldText,
} from './ChargeCard.styled';

interface IProps {
  charge: Charge;
  onPay(charge: Charge): void;
  onEdit(charge: Charge): void;
  onDelete(charge: Charge): void;
}

const ChargeCard = ({
  charge: { amount, created, paidDate, paid, description, expirationDate },
  charge,
  onPay,
  onDelete,
  onEdit,
}: IProps) => {
  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });
  const expirationAt =
    expirationDate && formatRelative(expirationDate, new Date(), { locale: esLocale });
  const paidAt = paidDate && formatRelative(paidDate, new Date(), { locale: esLocale });

  return (
    <CardWrapper>
      <Card sx={{ width: '300px' }}>
        <CardContent>
          <DataEntry>
            <ClientIdText>${amount}</ClientIdText>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>{description}</DataEntryFieldText>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>
              Creado <b>{createdAt}</b>
            </DataEntryFieldText>
          </DataEntry>
          {!!expirationDate && (
            <DataEntry>
              <DataEntryFieldText>
                Expira <b>{expirationAt}</b>
              </DataEntryFieldText>
            </DataEntry>
          )}
          {paid && (
            <>
              <DataEntry>
                <SuccessDataEntryFieldText>Pagado</SuccessDataEntryFieldText>
              </DataEntry>
              <DataEntry>
                <DataEntryFieldText>
                  Pagado <b>{paidAt}</b>
                </DataEntryFieldText>
              </DataEntry>
            </>
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
