import { Card, CardActionArea, CardContent } from '@mui/material';
import { formatRelative, isValid } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import {
  CardWrapper,
  ClientIdText,
  ClientNameText,
  DataEntry,
  DataEntryFieldText,
  StatusCardText,
} from './LoanCard.styled';
import Loan from '../../models/Loan.model';
import Client from '../../models/Client.model';
import Link from 'next/link';
import { LoanStatusText } from '../../constants/Common.constants';

interface IProps {
  loan: Loan;
  client: Client;
  showClientDetails?: boolean;
}

const LoanCard = ({
  client,
  loan: { weeks, payments, amount, created, expiredDate, id },
  loan,
}: IProps) => {
  const { name, surname, clientId } = client;
  const createdAt = isValid(created) && formatRelative(created, new Date(), { locale: esLocale });
  const expiresAt =
    isValid(expiredDate) && formatRelative(expiredDate, new Date(), { locale: esLocale });
  const currentBalance = loan.getCurrentBalance();
  const statusText = LoanStatusText[loan.status];

  return (
    <CardWrapper>
      <Link href={`/clients/${client.id}/loans/${id}`} passHref>
        <Card sx={{ width: '300px' }}>
          <CardActionArea>
            <CardContent>
              <DataEntry>
                <ClientIdText>${amount}</ClientIdText>
                <StatusCardText $status={loan.status}>{statusText}</StatusCardText>
              </DataEntry>
              <DataEntry>
                <ClientNameText>
                  ({clientId}) {name} {surname}
                </ClientNameText>
              </DataEntry>
              {!!currentBalance && (
                <DataEntry>
                  <DataEntryFieldText>
                    <b>${currentBalance.toFixed(2)}</b> Adeudo Actual
                  </DataEntryFieldText>
                </DataEntry>
              )}
              <DataEntry>
                <DataEntryFieldText>
                  <b>{weeks}</b> Semanas
                </DataEntryFieldText>
              </DataEntry>
              <DataEntry>
                <DataEntryFieldText>
                  Creado <b>{createdAt}</b>
                </DataEntryFieldText>
              </DataEntry>

              <DataEntry>
                <DataEntryFieldText>
                  {!!payments.length ? (
                    <>
                      <b>{payments.length}</b> Pago(s)
                    </>
                  ) : (
                    <b>Sin Pagos</b>
                  )}
                </DataEntryFieldText>
              </DataEntry>
              {!loan.isExpired && (
                <DataEntry>
                  <DataEntryFieldText>
                    Vence en <b>{expiresAt}</b>
                  </DataEntryFieldText>
                </DataEntry>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </CardWrapper>
  );
};

export default LoanCard;
