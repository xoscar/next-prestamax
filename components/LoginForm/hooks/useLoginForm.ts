import { useFormik } from 'formik';

export enum LoginFields {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export type TLoginValues = {
  username: string;
  password: string;
};

interface IProps {
  onSubmit(values: TLoginValues): void;
}

const validateLogin = (values: TLoginValues): Partial<TLoginValues> => {
  const errors: Partial<TLoginValues> = {};

  if (!values.password) errors.password = 'La contraseña no debe de ser vacia';
  if (!values.username) errors.username = 'El usuario no debe de ser vacio';

  return errors;
};

const getInitialValues = (): TLoginValues => ({
  [LoginFields.USERNAME]: '',
  [LoginFields.PASSWORD]: '',
});

const useLoginForm = ({ onSubmit }: IProps) => {
  const formik = useFormik({
    initialValues: getInitialValues(),
    validate: validateLogin,
    onSubmit,
  });

  return formik;
};

export default useLoginForm;
