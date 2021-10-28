import { Button, Card, CardActions, CardContent } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { FunctionComponent } from 'react';
import Loan from '../../records/Loan';
import {
  CardWrapper,
  ClientIdText,
  ClientNameText,
  DataEntry,
  DataEntryFieldText,
  DataEntryFieldValue,
} from './loanCardStyled';

export type LoanCardProps = {
  loan: Loan;
  showClientDetails?: boolean;
};

const LoanCard: FunctionComponent<LoanCardProps> = ({
  loan: { weeks, number_id, current_balance, paymentList, amount, created, expired_date, expired },
}) => {
  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });
  const expiresAt =
    isValid(expired_date) && formatRelative(expired_date, new Date(), { locale: esLocale });
  const isExpired = !!expired ? 'Si' : 'No';
  const currentBalance = current_balance ? `$${current_balance.toFixed(2)}` : 'Pagado';

  return (
    <CardWrapper>
      <Card sx={{ width: '300px' }}>
        <CardContent>
          <DataEntry>
            <ClientIdText>${amount}</ClientIdText>
          </DataEntry>
          <DataEntry>
            <ClientNameText>{weeks} semanas</ClientNameText>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Id</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{number_id}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Creado</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{createdAt}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText># de Pagos</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{paymentList.length}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Adeudo Actual</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{currentBalance}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Vence en</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{expiresAt}</DataEntryFieldValue>
          </DataEntry>
          <DataEntry>
            <DataEntryFieldText>Vencido</DataEntryFieldText>{' '}
            <DataEntryFieldValue>{isExpired}</DataEntryFieldValue>
          </DataEntry>
        </CardContent>
        <CardActions>
          <Button size="small">Ver Más</Button>
        </CardActions>
      </Card>
    </CardWrapper>
  );
};

export default LoanCard;
