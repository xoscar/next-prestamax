export enum LoginFields {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export type LoginValues = {
  username: string;
  password: string;
};

const validateLogin = (values: LoginValues): Partial<LoginValues> => {
  const errors: Partial<LoginValues> = {};

  if (!values.password) errors.password = 'La contraseña no debe de ser vacia';
  if (!values.username) errors.username = 'El usuario no debe de ser vacio';

  return errors;
};

const getInitialValues = (): LoginValues => ({
  [LoginFields.USERNAME]: '',
  [LoginFields.PASSWORD]: '',
});

export type LoginFormFormikProps = {
  initialValues: LoginValues;
  validate: typeof validateLogin;
};

const formikProps = (): LoginFormFormikProps => ({
  initialValues: getInitialValues(),
  validate: validateLogin,
});

export default formikProps;
