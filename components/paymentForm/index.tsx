import { FunctionComponent, useCallback, useMemo } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, TextField } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { formatISO } from 'date-fns';
import { FIELDS, formikProps } from './paymentFormFormikProps';
import { ActionsContainer, Container, FormSection, SubmitButton } from './paymentFormStyled';
import Payment, { FormDataPaymentType } from '../../records/Payment';

export type PaymentFormProps = {
  payment?: Payment;
  onSubmit(values: FormDataPaymentType): void;
  onCancel(): void;
};

const PaymentForm: FunctionComponent<PaymentFormProps> = ({ payment, onSubmit, onCancel }) => {
  const { isInitialValid, initialValues, validate } = useMemo(
    () => formikProps(payment),
    [payment],
  );
  const isEditing = !!isInitialValid;

  const parseValues = useCallback(
    ({ amount, created }: FormDataPaymentType): void => {
      const parsedData: FormDataPaymentType = {
        amount: +amount,
        created,
      };

      onSubmit(parsedData);
    },
    [onSubmit],
  );

  return (
    <Formik
      isInitialValid={isInitialValid}
      initialValues={initialValues}
      validateOnChange={false}
      validate={validate}
      onSubmit={parseValues}
    >
      {({ values, errors, setFieldValue, submitForm }: FormikProps<FormDataPaymentType>) => {
        return (
          <>
            <Container>
              <FormSection>
                <TextField
                  id="input-payment-amount"
                  label="Cantidad"
                  error={!!errors[FIELDS.AMOUNT]}
                  helperText={errors[FIELDS.AMOUNT]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.AMOUNT, newValue);
                  }}
                  fullWidth
                  type="number"
                  variant="standard"
                  value={values.amount}
                />
              </FormSection>
              {isEditing && (
                <FormSection>
                  <DesktopDatePicker
                    label="Creado"
                    inputFormat="dd/MM/yyyy"
                    value={values.created}
                    onChange={(newValue) => {
                      if (newValue) setFieldValue(FIELDS.CREATED, formatISO(new Date(newValue)));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormSection>
              )}
            </Container>
            <ActionsContainer>
              <Button color="warning" onClick={onCancel}>
                Cancelar
              </Button>
              <SubmitButton onClick={() => submitForm()}>
                {isEditing ? 'Editar' : 'Agregar'}
              </SubmitButton>
            </ActionsContainer>
          </>
        );
      }}
    </Formik>
  );
};

export default PaymentForm;
