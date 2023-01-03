import { FunctionComponent, useState } from 'react';
import { noop } from 'lodash';
import { Button, TextField } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import useClientForm from './hooks/useClientForm';
import { ActionsContainer, Container, FormSection, SubmitButton } from './ClientForm.styled';
import Client, { TPartialClient } from '../../models/Client.model';

export type ClientFormProps = {
  client?: Client;
  onSubmit(values: TPartialClient): void;
  onCancel?(): void;
};

const ClientForm: FunctionComponent<ClientFormProps> = ({ client, onSubmit, onCancel = noop }) => {
  const { handleSubmit, errors, values, handleChange } = useClientForm({
    onSubmit,
    client,
  });
  const [isDisabled, setIsDisabled] = useState(!!client);
  const isEditing = !!client;

  return (
    <form onSubmit={handleSubmit}>
      <>
        <Container>
          <FormSection>
            <TextField
              id="input-client-name"
              label="Nombre"
              error={!!errors.name}
              helperText={errors.name}
              name="name"
              onChange={handleChange}
              disabled={isDisabled}
              fullWidth
              variant="standard"
              value={values.name}
            />
          </FormSection>
          <FormSection>
            <TextField
              id="input-client-surname"
              label="Apellido"
              error={!!errors.surname}
              helperText={errors.surname}
              name="surname"
              onChange={handleChange}
              disabled={isDisabled}
              fullWidth
              variant="standard"
              value={values.surname}
            />
          </FormSection>
          <FormSection>
            <TextField
              id="input-client-phone"
              label="Telefono"
              error={!!errors.phone}
              helperText={errors.phone}
              name="phone"
              onChange={handleChange}
              disabled={isDisabled}
              fullWidth
              variant="standard"
              value={values.phone}
            />
          </FormSection>
          <FormSection>
            <TextField
              id="input-client-address"
              label="Direccion"
              error={!!errors.address}
              helperText={errors.address}
              name="address"
              onChange={handleChange}
              disabled={isDisabled}
              fullWidth
              variant="standard"
              value={values.address}
              multiline
            />
          </FormSection>
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
          <SubmitButton disabled={isDisabled} type="submit">
            {isEditing ? 'Editar' : 'Agregar'}
          </SubmitButton>
        </ActionsContainer>
      </>
    </form>
  );
};

export default ClientForm;
