import Client, { FormDataClientType } from '../../records/Client';

export enum FIELDS {
  ADDRESS = 'address',
  PHONE = 'phone',
  NAME = 'name',
  SURNAME = 'surname',
}

export const getInitialValues = (client?: Client): FormDataClientType => {
  const { address = '', phone = '', name = '', surname = '' } = client || {};

  return {
    address,
    phone,
    name,
    surname,
  };
};

const validate = (values: FormDataClientType): Partial<FormDataClientType> => {
  const errors: Partial<FormDataClientType> = {};

  if (!values.phone) errors.phone = 'El telefono es requerido';
  if (!values.address) errors.address = 'La direcion es requerido';
  if (!values.name) errors.name = 'El nombre es requerido';
  if (!values.surname) errors.surname = 'El apellido es requerido';

  return errors;
};

export type formFormikType = {
  isInitialValid: boolean;
  initialValues: FormDataClientType;
  validate: typeof validate;
};

export const formikProps = (client?: Client): formFormikType => ({
  isInitialValid: !!client,
  initialValues: getInitialValues(client),
  validate,
});
