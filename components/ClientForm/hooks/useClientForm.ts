import { useFormik } from 'formik';
import Client, { TPartialClient } from '../../../models/Client.model';

export const getInitialValues = (client?: Client): TPartialClient => {
  const { address = '', phone = '', name = '', surname = '' } = client || {};

  return {
    address,
    phone,
    name,
    surname,
  };
};

const validate = (values: TPartialClient): TPartialClient => {
  const errors: Partial<TPartialClient> = {};

  if (!values.phone) errors.phone = 'El telefono es requerido';
  if (!values.address) errors.address = 'La direcion es requerido';
  if (!values.name) errors.name = 'El nombre es requerido';
  if (!values.surname) errors.surname = 'El apellido es requerido';

  return errors;
};

interface IProps {
  onSubmit(values: TPartialClient): void;
  client?: Client;
}

const useClientForm = ({ onSubmit, client }: IProps) => {
  const formik = useFormik({
    isInitialValid: !!client,
    initialValues: getInitialValues(client),
    validate,
    onSubmit,
  });

  return formik;
};

export default useClientForm;
