import { IKeyValue } from '../../interfaces/ICommon';
import Charge, { FormDataChargeType } from '../../records/Charge';

export enum FIELDS {
  AMOUNT = 'amount',
  DESCRIPTION = 'description',
  EXPIRED_DATE = 'expiration_date',
}

export const getInitialValues = (charge?: Charge): FormDataChargeType => {
  const { amount = 0, expiration_date = new Date(), description = '' } = charge || {};

  return {
    amount,
    expiration_date: expiration_date.toISOString(),
    description,
  };
};

const validate = (values: FormDataChargeType): IKeyValue<string> => {
  const errors: IKeyValue<string> = {};

  if (!values.amount) errors.amount = 'La cantidad es requerida';
  if (!values.description) errors.description = 'La descripcion es requerida';
  if (!values.expiration_date) errors.expiration_date = 'La fecha de expiracion es requerida';

  return errors;
};

export type formFormikType = {
  isInitialValid: boolean;
  initialValues: FormDataChargeType;
  validate: typeof validate;
};

export const formikProps = (charge?: Charge): formFormikType => ({
  isInitialValid: !!charge,
  initialValues: getInitialValues(charge),
  validate,
});
