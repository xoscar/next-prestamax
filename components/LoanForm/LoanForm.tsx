import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import useLoanForm from './hooks/useLoanForm';
import {
  ActionsContainer,
  AddressFormSection,
  Container,
  FormSection,
  SubmitButton,
} from './LoanForm.styled';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Loan, { TPartialLoan } from '../../models/Loan.model';
import { noop } from 'lodash';

interface IProps {
  loan?: Loan;
  onSubmit(values: TPartialLoan): void;
  onCancel?(): void;
}

const LoanForm = ({ loan, onSubmit, onCancel = noop }: IProps) => {
  const [isDisabled, setIsDisabled] = useState(!!loan);
  const isEditing = !!loan;
  const { handleSubmit, errors, handleChange, values } = useLoanForm({ onSubmit, loan });

  return (
    <form onSubmit={handleSubmit}>
      <>
        <Container>
          <FormSection>
            <TextField
              id="input-loan-amount"
              label="Cantidad"
              error={!!errors.amount}
              helperText={errors.amount}
              name="amount"
              onChange={handleChange}
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
              error={!!errors.weeks}
              helperText={errors.weeks}
              onChange={handleChange}
              disabled={isDisabled}
              fullWidth
              type="number"
              variant="standard"
              value={values.weeks}
              name="weeks"
            />
          </FormSection>
          <FormSection>
            <TextField
              id="input-loan-weekly-payment"
              label="Pago Semanal"
              error={!!errors.weeklyPayment}
              helperText={errors.weeklyPayment}
              onChange={handleChange}
              disabled={isDisabled}
              fullWidth
              variant="standard"
              type="number"
              name="weeklyPayment"
              value={values.weeklyPayment}
            />
          </FormSection>
          {isEditing && (
            <FormSection>
              <DesktopDatePicker
                label="Creado"
                disabled={isDisabled}
                inputFormat="dd/MM/yyyy"
                value={values.created}
                onChange={(newDate) =>
                  !!newDate && handleChange({ target: { name: 'created', value: newDate } })
                }
                renderInput={(params: any) => <TextField {...params} />}
              />
            </FormSection>
          )}
          <AddressFormSection>
            <TextField
              id="input-loan-description"
              label="Descripcion"
              error={!!errors.description}
              helperText={errors.description}
              onChange={handleChange}
              disabled={isDisabled}
              fullWidth
              variant="standard"
              name="description"
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
          <SubmitButton disabled={isDisabled} type="submit">
            {isEditing ? 'Editar' : 'Agregar'}
          </SubmitButton>
        </ActionsContainer>
      </>
    </form>
  );
};

export default LoanForm;
