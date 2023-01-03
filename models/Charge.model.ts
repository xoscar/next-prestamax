import isAfter from 'date-fns/isAfter';
import validator from 'validator';
import isValid from 'date-fns/isValid';
import PrismaClient from '@prisma/client';
import { isEmpty } from 'lodash';

type Charge = PrismaClient.Charge & {
  isExpired(): boolean;
};

export type TPartialCharge = Partial<PrismaClient.Charge>;

const Charge = ({
  id = '',
  v = 0,
  clientId = '',
  amount = 0,
  paid = false,
  expirationDate = new Date(),
  paidDate = new Date(),
  userId = '',
  weeks = 0,
  created = new Date(),
  description = '',
}: TPartialCharge = {}): Charge => ({
  id,
  v,
  clientId,
  amount,
  paid,
  expirationDate: expirationDate ? new Date(expirationDate) : null,
  paidDate: paidDate ? new Date(paidDate) : null,
  created: new Date(created),
  userId,
  weeks,
  description,
  isExpired() {
    return isAfter(Date.now(), this.expirationDate ?? new Date()) && !this.paid;
  },
});

Charge.validate = (clientId: string, values: TPartialCharge = {}): Array<string> => {
  const errors = [];
  if (isEmpty(values)) errors.push('Invalid request.');
  const { amount, created } = values;

  if (!amount || !validator.isNumeric(`${amount}`)) errors.push('La cantidad debe ser numerica.');
  if (!clientId || !validator.isMongoId(`${clientId}`))
    errors.push('El número de identificación del cliente es invalido.');
  if (created && isValid(created)) errors.push('La fecha de creación no es válida.');

  return errors;
};

export default Charge;
