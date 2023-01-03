import { useFormik } from 'formik';
import Payment, { TPartialPayment } from '../../../models/Payment.model';

export const getInitialValues = (payment?: Payment): TPartialPayment => {
  const { amount = 0, created = new Date() } = payment || {};

  return {
    amount,
    created,
  };
};

const validate = (values: TPartialPayment): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.amount) errors.amount = 'La cantidad es requerida';

  return errors;
};

interface IProps {
  onSubmit(values: TPartialPayment): void;
  payment?: Payment;
}

const usePaymentForm = ({ payment, onSubmit }: IProps) => {
  const formik = useFormik({
    isInitialValid: !!payment,
    initialValues: getInitialValues(payment),
    validate,
    onSubmit,
  });

  return formik;
};

export default usePaymentForm;
