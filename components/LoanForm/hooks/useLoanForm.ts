import { useFormik } from 'formik';
import Loan, { TPartialLoan } from '../../../models/Loan.model';

export const getInitialValues = (loan?: Loan): TPartialLoan => {
  const {
    amount = 0,
    weeks = 0,
    weeklyPayment = 0,
    description = '',
    created = new Date(),
  } = loan || {};

  return {
    amount,
    weeks,
    weeklyPayment,
    description,
    created,
  };
};

const validate = (values: TPartialLoan): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.amount) errors.amount = 'La cantidad es requerida';
  if (!values.description) errors.description = 'La descripcion es requerida';
  if (!values.weeks) errors.weeks = 'El numero de semanas es requerido';
  if (!values.weeklyPayment) errors.weekly_payment = 'El pago semanal es requerido';

  return errors;
};

interface IProps {
  loan?: Loan;
  onSubmit(values: TPartialLoan): void;
}

const useLoanForm = ({ onSubmit, loan }: IProps) => {
  const formik = useFormik({
    isInitialValid: !!loan,
    initialValues: getInitialValues(loan),
    onSubmit,
    validate,
  });

  return formik;
};

export default useLoanForm;
