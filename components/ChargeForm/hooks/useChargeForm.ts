import { useFormik } from 'formik';
import Charge, { TPartialCharge } from '../../../models/Charge.model';

export const getInitialValues = (charge?: Charge): TPartialCharge => {
  const { amount = 0, expirationDate = new Date(), description = '' } = charge || {};

  return {
    amount,
    expirationDate,
    description,
  };
};

const validate = (values: TPartialCharge): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.amount) errors.amount = 'La cantidad es requerida';
  if (!values.description) errors.description = 'La descripcion es requerida';
  if (!values.expirationDate) errors.expirationDate = 'La fecha de expiracion es requerida';

  return errors;
};

interface IProps {
  charge?: Charge;
  onSubmit(values: TPartialCharge): void;
}

const useChargeForm = ({ charge, onSubmit }: IProps) => {
  const formik = useFormik({
    isInitialValid: !!charge,
    initialValues: getInitialValues(charge),
    validate,
    onSubmit,
  });

  return formik;
};

export default useChargeForm;
