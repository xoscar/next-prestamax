import PrismaClient from '@prisma/client';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { ObjectId } from 'bson';

type Payment = PrismaClient.LoansPayments;
export type TPartialPayment = Partial<PrismaClient.LoansPayments>;

const Payment = ({
  id = new ObjectId().toString(),
  amount = 0,
  created = new Date(),
}: TPartialPayment = {}): Payment => ({
  id,
  amount,
  created: new Date(created),
});

Payment.validate = (values: TPartialPayment = {}, currentBalance: number): Array<string> => {
  const errors = [];
  if (isEmpty(values)) errors.push('Invalid request.');

  const { amount = 0 } = values;

  if (!amount || !validator.isNumeric(`${amount}`)) {
    errors.push('La cantidad del pago debe de ser numerica.');
  }

  if (currentBalance - amount < 0)
    errors.push('El abono es mayor a la cantidad del saldo del prestamo');
  if (!currentBalance) errors.push('El prestamo ya fue saldado.');

  return errors;
};

export default Payment;
