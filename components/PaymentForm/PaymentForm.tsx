import { Button, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import usePaymentForm from './hooks/usePaymentForm';
import { ActionsContainer, Container, FormSection, SubmitButton } from './PaymentForm.styled';
import Payment, { TPartialPayment } from '../../models/Payment.model';

interface IProps {
  payment?: Payment;
  onSubmit(values: TPartialPayment): void;
  onCancel(): void;
}

const PaymentForm = ({ payment, onSubmit, onCancel }: IProps) => {
  const { errors, values, handleChange, handleSubmit } = usePaymentForm({ payment, onSubmit });
  const isEditing = !!payment;

  return (
    <form onSubmit={handleSubmit}>
      <>
        <Container>
          <FormSection>
            <TextField
              id="input-payment-amount"
              label="Cantidad"
              error={!!errors.amount}
              helperText={errors.amount}
              onChange={handleChange}
              fullWidth
              type="number"
              name="amount"
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
                onChange={(newDate) => {
                  handleChange({ target: { name: 'created', value: newDate } });
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
          <SubmitButton type="submit">{isEditing ? 'Editar' : 'Agregar'}</SubmitButton>
        </ActionsContainer>
      </>
    </form>
  );
};

export default PaymentForm;
