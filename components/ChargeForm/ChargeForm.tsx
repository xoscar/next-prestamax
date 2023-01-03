import { Button, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import useChargeForm from './hooks/useChargeForm';
import {
  ActionsContainer,
  AddressFormSection,
  Container,
  FormSection,
  SubmitButton,
} from './ChargeForm.styled';
import Charge, { TPartialCharge } from '../../models/Charge.model';

interface IProps {
  charge?: Charge;
  onSubmit(values: TPartialCharge): void;
  onCancel(): void;
}

const ChargeForm = ({ charge, onSubmit, onCancel }: IProps) => {
  const { values, errors, handleSubmit, handleChange } = useChargeForm({
    onSubmit,
    charge,
  });
  const isEditing = !!charge;

  return (
    <form onSubmit={handleSubmit}>
      <>
        <Container>
          <FormSection>
            <TextField
              id="input-charge-amount"
              label="Cantidad"
              error={!!errors.amount}
              helperText={errors.amount}
              onChange={handleChange}
              fullWidth
              type="number"
              variant="standard"
              name="amount"
              value={values.amount}
            />
          </FormSection>
          <FormSection>
            <DesktopDatePicker
              label="Fecha de expiracion"
              inputFormat="dd/MM/yyyy"
              value={values.expirationDate}
              onChange={(newDate) =>
                handleChange({ target: { name: 'expirationDate', value: newDate } })
              }
              renderInput={(params: any) => <TextField {...params} />}
            />
          </FormSection>
          <AddressFormSection>
            <TextField
              id="input-charge-description"
              label="Descripcion"
              error={!!errors.description}
              helperText={errors.description}
              onChange={handleChange}
              fullWidth
              name="description"
              variant="standard"
              value={values.description}
            />
          </AddressFormSection>
        </Container>
        <ActionsContainer>
          <Button color="warning" onClick={onCancel}>
            Cancelar
          </Button>
          <SubmitButton type="submit">{isEditing ? 'Editar' : 'Agregar'}</SubmitButton>
        </ActionsContainer>
      </>
    </form>
  );
};

export default ChargeForm;
