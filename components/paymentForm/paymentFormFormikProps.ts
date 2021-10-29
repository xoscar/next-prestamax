import { IKeyValue } from '../../interfaces/ICommon';
import Payment, { FormDataPaymentType } from '../../records/Payment';

export enum FIELDS {
  AMOUNT = 'amount',
  CREATED = 'created',
}

export const getInitialValues = (payment?: Payment): FormDataPaymentType => {
  const { amount = 0, created = new Date() } = payment || {};

  return {
    amount,
    created,
  };
};

const validate = (values: FormDataPaymentType): IKeyValue<string> => {
  const errors: IKeyValue<string> = {};

  if (!values.amount) errors.amount = 'La cantidad es requerida';

  return errors;
};

export type formFormikType = {
  isInitialValid: boolean;
  initialValues: FormDataPaymentType;
  validate: typeof validate;
};

export const formikProps = (payment?: Payment): formFormikType => ({
  isInitialValid: !!payment,
  initialValues: getInitialValues(payment),
  validate,
});
