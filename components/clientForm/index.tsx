import { FunctionComponent, useMemo } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, TextField } from '@mui/material';
import { FIELDS, formikProps } from './clientFormFormikProps';
import Client, { FormDataClientType } from '../../records/Client';
import {
  ActionsContainer,
  AddressFormSection,
  Container,
  FormSection,
  SubmitButton,
} from './clientFormStyled';

export type ClientFormProps = {
  client?: Client;
  onSubmit(values: FormDataClientType): void;
  onCancel(): void;
};

const ClientForm: FunctionComponent<ClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const { isInitialValid, initialValues, validate } = useMemo(() => formikProps(client), [client]);

  return (
    <Formik
      isInitialValid={isInitialValid}
      initialValues={initialValues}
      validateOnChange={false}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, setFieldValue, submitForm }: FormikProps<FormDataClientType>) => {
        return (
          <>
            <Container>
              <FormSection>
                <TextField
                  id="input-client-name"
                  label="Nombre"
                  error={!!errors[FIELDS.NAME]}
                  helperText={errors[FIELDS.NAME]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.NAME, newValue);
                  }}
                  fullWidth
                  variant="standard"
                  value={values.name}
                />
              </FormSection>
              <FormSection>
                <TextField
                  id="input-client-surname"
                  label="Apellido"
                  error={!!errors[FIELDS.SURNAME]}
                  helperText={errors[FIELDS.SURNAME]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.SURNAME, newValue);
                  }}
                  fullWidth
                  variant="standard"
                  value={values.surname}
                />
              </FormSection>
              <FormSection>
                <TextField
                  id="input-client-phone"
                  label="Telefono"
                  error={!!errors[FIELDS.PHONE]}
                  helperText={errors[FIELDS.PHONE]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.PHONE, newValue);
                  }}
                  fullWidth
                  variant="standard"
                  value={values.phone}
                />
              </FormSection>
              <AddressFormSection>
                <TextField
                  id="input-client-address"
                  label="Direccion"
                  error={!!errors[FIELDS.ADDRESS]}
                  helperText={errors[FIELDS.ADDRESS]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    setFieldValue(FIELDS.ADDRESS, newValue);
                  }}
                  fullWidth
                  variant="standard"
                  value={values.address}
                />
              </AddressFormSection>
            </Container>
            <ActionsContainer>
              <Button color="warning" onClick={onCancel}>
                Cancelar
              </Button>
              <SubmitButton onClick={() => submitForm()}>Agregar</SubmitButton>
            </ActionsContainer>
          </>
        );
      }}
    </Formik>
  );
};

export default ClientForm;
