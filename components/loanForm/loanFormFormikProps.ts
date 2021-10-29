import { IKeyValue } from '../../interfaces/ICommon';
import Loan, { FormDataLoanType } from '../../records/Loan';

export enum FIELDS {
  AMOUNT = 'amount',
  WEEKS = 'weeks',
  WEEKLY_PAYMENT = 'weekly_payment',
  DESCRIPTION = 'description',
  CREATED = 'created',
}

export const getInitialValues = (loan?: Loan): FormDataLoanType => {
  const {
    amount = 0,
    weeks = 0,
    weekly_payment = 0,
    description = '',
    created = new Date(),
  } = loan || {};

  return {
    amount,
    weeks,
    weekly_payment,
    description,
    created: created.toISOString(),
  };
};

const validate = (values: FormDataLoanType): IKeyValue<string> => {
  const errors: IKeyValue<string> = {};

  if (!values.amount) errors.amount = 'La cantidad es requerida';
  if (!values.description) errors.description = 'La descripcion es requerida';
  if (!values.weeks) errors.weeks = 'El numero de semanas es requerido';
  if (!values.weekly_payment) errors.weekly_payment = 'El pago semanal es requerido';

  return errors;
};

export type formFormikType = {
  isInitialValid: boolean;
  initialValues: FormDataLoanType;
  validate: typeof validate;
};

export const formikProps = (loan?: Loan): formFormikType => ({
  isInitialValid: !!loan,
  initialValues: getInitialValues(loan),
  validate,
});
