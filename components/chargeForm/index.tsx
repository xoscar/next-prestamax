import { FunctionComponent, useCallback, useMemo } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, TextField } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { formatISO } from 'date-fns';
import { FIELDS, formikProps } from './chargeFormFormikProps';
import {
  ActionsContainer,
  AddressFormSection,
  Container,
  FormSection,
  SubmitButton,
} from './chargeFormStyled';
import Charge, { FormDataChargeType } from '../../records/Charge';

export type ChargeFormProps = {
  charge?: Charge;
  onSubmit(values: FormDataChargeType): void;
  onCancel(): void;
};

const ChargeForm: FunctionComponent<ChargeFormProps> = ({ charge, onSubmit, onCancel }) => {
  const { isInitialValid, initialValues, validate } = useMemo(() => formikProps(charge), [charge]);
  const isEditing = !!isInitialValid;

  const parseValues = useCallback(
    ({ amount, expiration_date, description }: FormDataChargeType): void => {
      const parsedData: FormDataChargeType = {
        amount: +amount,
        expiration_date,
        description,
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
      {({ values, errors, setFieldValue, submitForm }: FormikProps<FormDataChargeType>) => {
        return (
          <>
            <Container>
              <FormSection>
                <TextField
                  id="input-charge-amount"
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
              <FormSection>
                <DesktopDatePicker
                  label="Fecha de expiracion"
                  inputFormat="dd/MM/yyyy"
                  value={values.expiration_date}
                  onChange={(newValue) => {
                    if (newValue) setFieldValue(FIELDS.EXPIRED_DATE, formatISO(new Date(newValue)));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormSection>
              <AddressFormSection>
                <TextField
                  id="input-charge-description"
                  label="Descripcion"
                  error={!!errors[FIELDS.DESCRIPTION]}
                  helperText={errors[FIELDS.DESCRIPTION]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.DESCRIPTION, newValue);
                  }}
                  fullWidth
                  variant="standard"
                  value={values.description}
                />
              </AddressFormSection>
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

export default ChargeForm;
