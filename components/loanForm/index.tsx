import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, TextField } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { FIELDS, formikProps } from './loanFormFormikProps';
import {
  ActionsContainer,
  AddressFormSection,
  Container,
  FormSection,
  SubmitButton,
} from './loanFormStyled';
import Loan, { FormDataLoanType } from '../../records/Loan';
import { DesktopDatePicker } from '@mui/lab';
import formatISO from 'date-fns/formatISO';

export type LoanFormFormProps = {
  loan?: Loan;
  onSubmit(values: FormDataLoanType): void;
  onCancel(): void;
};

const LoanForm: FunctionComponent<LoanFormFormProps> = ({ loan, onSubmit, onCancel }) => {
  const { isInitialValid, initialValues, validate } = useMemo(() => formikProps(loan), [loan]);
  const [isDisabled, setIsDisabled] = useState(!!isInitialValid);
  const isEditing = !!isInitialValid;

  const parseValues = useCallback(
    ({ amount, weeks, weekly_payment, description, created }: FormDataLoanType): void => {
      const parsedData: FormDataLoanType = {
        amount: +amount,
        weeks: +weeks,
        weekly_payment: +weekly_payment,
        description,
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
      {({ values, errors, setFieldValue, submitForm }: FormikProps<FormDataLoanType>) => {
        return (
          <>
            <Container>
              <FormSection>
                <TextField
                  id="input-loan-amount"
                  label="Cantidad"
                  error={!!errors[FIELDS.AMOUNT]}
                  helperText={errors[FIELDS.AMOUNT]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.AMOUNT, newValue);
                  }}
                  disabled={isDisabled}
                  fullWidth
                  type="number"
                  variant="standard"
                  value={values.amount}
                />
              </FormSection>
              <FormSection>
                <TextField
                  id="input-loan-weeks"
                  label="Semanas"
                  error={!!errors[FIELDS.WEEKS]}
                  helperText={errors[FIELDS.WEEKS]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.WEEKS, newValue);
                  }}
                  disabled={isDisabled}
                  fullWidth
                  type="number"
                  variant="standard"
                  value={values.weeks}
                />
              </FormSection>
              <FormSection>
                <TextField
                  id="input-loan-weekly-payment"
                  label="Pago Semanal"
                  error={!!errors[FIELDS.WEEKLY_PAYMENT]}
                  helperText={errors[FIELDS.WEEKLY_PAYMENT]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.WEEKLY_PAYMENT, newValue);
                  }}
                  disabled={isDisabled}
                  fullWidth
                  variant="standard"
                  type="number"
                  value={values.weekly_payment}
                />
              </FormSection>
              {isEditing && (
                <FormSection>
                  <DesktopDatePicker
                    label="Creado"
                    disabled={isDisabled}
                    inputFormat="dd/MM/yyyy"
                    value={values.created}
                    onChange={(newValue) => {
                      if (newValue) setFieldValue(FIELDS.CREATED, formatISO(new Date(newValue)));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormSection>
              )}
              <AddressFormSection>
                <TextField
                  id="input-loan-description"
                  label="Descripcion"
                  error={!!errors[FIELDS.DESCRIPTION]}
                  helperText={errors[FIELDS.DESCRIPTION]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.DESCRIPTION, newValue);
                  }}
                  disabled={isDisabled}
                  fullWidth
                  variant="standard"
                  value={values.description}
                />
              </AddressFormSection>
            </Container>
            <ActionsContainer>
              {isDisabled && (
                <Button color="warning" onClick={() => setIsDisabled(false)}>
                  <LockOpenIcon />
                  Desbloquear
                </Button>
              )}
              {isEditing && !isDisabled && (
                <Button color="warning" onClick={() => setIsDisabled(true)}>
                  <LockIcon />
                  Bloquear
                </Button>
              )}
              {!isEditing && (
                <Button color="warning" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
              <SubmitButton disabled={isDisabled} onClick={() => submitForm()}>
                {isEditing ? 'Editar' : 'Agregar'}
              </SubmitButton>
            </ActionsContainer>
          </>
        );
      }}
    </Formik>
  );
};

export default LoanForm;
