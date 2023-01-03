import { Card, CardActionArea, CardContent } from '@mui/material';
import esLocale from 'date-fns/locale/es';
import Link from 'next/link';
import {
  CardWrapper,
  ClientIdText,
  ClientNameText,
  DangerDataEntryFieldText,
  DataEntry,
  DataEntryFieldText,
} from './ClientCard.styled';
import Client from '../../models/Client.model';
import { formatRelative, isValid } from 'date-fns';
import { useMemo } from 'react';

export interface IProps {
  client: Client;
}

const ClientCard = ({ client: { name, surname, clientId, id }, client }: IProps) => {
  const { activeCharges, activeLoans, totalDebt, expiredLoansCount, lastPayment } = useMemo(
    () => Client.getStats(client),
    [client],
  );

  const lastPaymentDate =
    lastPayment && isValid(lastPayment)
      ? formatRelative(lastPayment, new Date(), { locale: esLocale })
      : 'No registrado';

  return (
    <CardWrapper>
      <Link href={`/clients/${id}`} passHref>
        <Card sx={{ width: '300px' }}>
          <CardActionArea>
            <CardContent>
              <DataEntry>
                <ClientIdText>{clientId}</ClientIdText>
              </DataEntry>
              <DataEntry>
                <ClientNameText>
                  {name} {surname}
                </ClientNameText>
              </DataEntry>

              <DataEntry>
                <DataEntryFieldText>
                  {!!totalDebt ? (
                    <>
                      <b>${totalDebt.toFixed(2)}</b> de Adeudo
                    </>
                  ) : (
                    <b>Sin Adeudo</b>
                  )}
                </DataEntryFieldText>
              </DataEntry>
              {!!activeLoans && (
                <DataEntry>
                  <DataEntryFieldText>
                    <b>{activeLoans}</b> Prestamo(s) activos
                  </DataEntryFieldText>
                </DataEntry>
              )}
              {lastPayment && isValid(lastPayment) && (
                <DataEntry>
                  <DataEntryFieldText>
                    Ult. Abono <b>{lastPaymentDate}</b>
                  </DataEntryFieldText>
                </DataEntry>
              )}
              {!!activeCharges && (
                <DataEntry>
                  <DataEntryFieldText>
                    <b>{activeCharges}</b> Cargo(s)
                  </DataEntryFieldText>
                </DataEntry>
              )}
              {!!expiredLoansCount && (
                <DataEntry>
                  <DangerDataEntryFieldText>
                    <b>{expiredLoansCount}</b> prestamos Vencidos
                  </DangerDataEntryFieldText>
                </DataEntry>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </CardWrapper>
  );
};

export default ClientCard;
