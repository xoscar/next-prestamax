import { Modal } from '@mui/material';
import { FunctionComponent } from 'react';
import Loan, { FormDataLoanType } from '../../records/Loan';
import LoanForm from '../loanForm';
import { ModalContent, ModalTitle } from './loanModalStyled';

export type LoanModalProps = {
  isOpen: boolean;
  onClose(): void;
  loan?: Loan;
  onSubmit(values: FormDataLoanType): void;
};

const LoanModal: FunctionComponent<LoanModalProps> = ({ isOpen, onClose, onSubmit, loan }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="loan-modal"
      aria-describedby="loan-modal"
    >
      <ModalContent>
        <ModalTitle>Agregar Prestamo</ModalTitle>
        <LoanForm onSubmit={onSubmit} loan={loan} onCancel={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default LoanModal;
